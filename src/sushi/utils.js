import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const getSushiAddress = (sushi) => {
  return sushi && sushi.sushiAddress
}
export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}

export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getFactoryContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.factory
}

export const getFarms = (sushi) => {
  return sushi
    ? sushi.contracts.pools.map(
        ({
          name,
          symbol,
          icon,
          lpAddress,
          lpContract,
          poolAddress,
          poolContract,
          earnTokenAddress,
          earnToken,
          rewards,
          rewardRate,
          staked,
          verified,
        }) => ({
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          poolAddress,
          poolContract,
          icon,
          earnTokenAddress,
          earnToken,
          rewards,
          rewardRate,
          staked,
          verified,
        }),
      )
    : []
}

export const getEarned = (poolContract, account) => {
  return poolContract.methods.earned(account).call()
}

export const approve = async (lpContract, contract, account) => {
  return lpContract.methods
    .approve(contract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSushiSupply = async (sushi) => {
  console.log('sushi', sushi)
  return new BigNumber(await sushi.contracts.sushi.methods.totalSupply().call())
}

export const stake = async (poolContract, amount, account) => {
  return poolContract.methods
    .stake(new BigNumber(amount).times(BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (poolContract, amount, account) => {
  return poolContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (poolContract, account) => {
  return poolContract.methods
    .getReward()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const createPool = (factoryContract, account, pairAddress) => {
  return factoryContract.methods
    .createUnipoolWithProxy(pairAddress)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
