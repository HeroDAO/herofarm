import BigNumber from 'bignumber.js/bignumber'
import SushiAbi from './abi/sushi.json'
import UNIV2PairAbi from './abi/uni_v2_lp.json'
import WETHAbi from './abi/weth.json'
import PoolAbi from './abi/pool.json'
import PoolFactoryAbi from './abi/factory.json'
import {
  contractAddresses,
  SUBTRACT_GAS_LIMIT,
  knownPools,
  INTEGERS,
} from './constants.js'
import * as Types from './types.js'

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3
    this.defaultConfirmations = options.defaultConfirmations
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5
    this.confirmationType =
      options.confirmationType || Types.ConfirmationType.Confirmed
    this.defaultGas = options.defaultGas
    this.defaultGasPrice = options.defaultGasPrice

    this.sushi = new this.web3.eth.Contract(SushiAbi)
    this.weth = new this.web3.eth.Contract(WETHAbi)

    this.pools = []
    this.factory = new this.web3.eth.Contract(PoolFactoryAbi)

    this.setProvider(provider, networkId)
    this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  async addPool({
    poolAddress,
    lpAddress,
    token0Symbol,
    token1Symbol,
    earnTokenAddress,
    earnToken,
    rewards,
    staked,
    verified,
  }) {
    const poolContract = new this.web3.eth.Contract(PoolAbi)
    this.setProviderForContract(poolContract, poolAddress)

    // Get reward rate for the pool
    const rewardRate = new BigNumber(
      await poolContract.methods.rewardRate().call(),
    )

    // Get Uniswap pair address from pool
    const lpContract = new this.web3.eth.Contract(UNIV2PairAbi)
    this.setProviderForContract(lpContract, lpAddress)

    // Check if it is a known pool
    const metadata = knownPools[poolAddress] || {}

    this.pools.push(
      Object.assign(
        {
          lpAddress,
          lpContract,
          poolAddress,
          poolContract,
          name: `${token0Symbol}-${token1Symbol} Pool`,
          symbol: `${token0Symbol}-${token1Symbol} UNI-V2 LP`,
          earnToken,
          earnTokenAddress,
          rewards,
          rewardRate: rewardRate.div(INTEGERS.INTEREST_RATE_BASE),
          staked,
          verified,
        },
        metadata,
      ),
    )
  }

  setProvider(provider, networkId) {
    this.provider = provider
    this.networkId = networkId

    this.setProviderForContract(this.sushi, contractAddresses.sushi[networkId])
    this.setProviderForContract(this.weth, contractAddresses.weth[networkId])
    this.setProviderForContract(
      this.factory,
      contractAddresses.factory[networkId],
    )

    this.pools.forEach(
      ({ lpContract, lpAddress, poolAddress, poolContract }) => {
        this.setProviderForContract(lpContract, lpAddress)
        this.setProviderForContract(poolContract, poolAddress)
      },
    )
  }

  setProviderForContract(contract, address) {
    contract.setProvider(this.provider)
    if (address) {
      contract.options.address = address
    } else {
      console.error('Contract address not found in network', this.networkId)
    }
  }

  setDefaultAccount(account) {
    this.sushi.options.from = account
  }

  async callContractFunction(method, options) {
    const {
      confirmations,
      confirmationType,
      autoGasMultiplier,
      ...txOptions
    } = options

    if (!this.blockGasLimit) {
      await this.setGasLimit()
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate
      if (
        this.defaultGas &&
        confirmationType !== Types.ConfirmationType.Simulate
      ) {
        txOptions.gas = this.defaultGas
      } else {
        try {
          console.log('estimating gas')
          gasEstimate = await method.estimateGas(txOptions)
        } catch (error) {
          const data = method.encodeABI()
          const { from, value } = options
          const to = method._parent._address
          error.transactionData = { from, value, data, to }
          throw error
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier
        const totalGas = Math.floor(gasEstimate * multiplier)
        txOptions.gas =
          totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas
        return { gasEstimate, g }
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0)
    } else {
      txOptions.value = '0'
    }

    const promi = method.send(txOptions)

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    }

    let hashOutcome = OUTCOMES.INITIAL
    let confirmationOutcome = OUTCOMES.INITIAL

    const t =
      confirmationType !== undefined ? confirmationType : this.confirmationType

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`)
    }

    let hashPromise
    let confirmationPromise

    if (
      t === Types.ConfirmationType.Hash ||
      t === Types.ConfirmationType.Both
    ) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        promi.on('transactionHash', (txHash) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED
            resolve(txHash)
            if (t !== Types.ConfirmationType.Both) {
              const anyPromi = promi
              anyPromi.off()
            }
          }
        })
      })
    }

    if (
      t === Types.ConfirmationType.Confirmed ||
      t === Types.ConfirmationType.Both
    ) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (
            (t === Types.ConfirmationType.Confirmed ||
              hashOutcome === OUTCOMES.RESOLVED) &&
            confirmationOutcome === OUTCOMES.INITIAL
          ) {
            confirmationOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        const desiredConf = confirmations || this.defaultConfirmations
        if (desiredConf) {
          promi.on('confirmation', (confNumber, receipt) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED
                resolve(receipt)
                const anyPromi = promi
                anyPromi.off()
              }
            }
          })
        } else {
          promi.on('receipt', (receipt) => {
            confirmationOutcome = OUTCOMES.RESOLVED
            resolve(receipt)
            const anyPromi = promi
            anyPromi.off()
          })
        }
      })
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return { transactionHash }
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise
    }

    const transactionHash = await hashPromise
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    }
  }

  async callConstantContractFunction(method, options) {
    const m2 = method
    const { blockNumber, ...txOptions } = options
    return m2.call(txOptions, blockNumber)
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest')
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT
  }
}
