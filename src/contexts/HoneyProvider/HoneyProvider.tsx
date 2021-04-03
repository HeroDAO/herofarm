import React, { createContext, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { useWallet } from 'use-wallet'

import { Sushi } from '../../sushi'

// TODO(onbjerg): We should move these type definitions into sushilib
// TODO(onbjerg): Make these type definitions more strict
interface Contracts {
  factory: any,
  pools: [],
  addPool(poolDefinition: {
    poolAddress: string,
    lpAddress: string,
    token0Symbol: string,
    token1Symbol: string,
    earnTokenAddress: string,
    earnToken: string,
    rewards: BigNumber,
    staked: BigNumber,
    verified: boolean
  }): Promise<void>
}

interface SushiLib {
  resetEVM(): Promise<void>,
  addAccount(address: string, number: number): void,
  setProvider(provider: any, networkId: number): void,
  setDefaultAccount(account: string): void,
  getDefaultAccount(): string,
  loadAccount(account: string): void,
  toBigN(a: any): any,
  contracts: Contracts
}

export interface HoneyContext {
  sushi?: SushiLib
}

export const Context = createContext<HoneyContext>({
  sushi: undefined,
})

declare global {
  interface Window {
    sushisauce: any
  }
}

const HoneyProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [sushi, setSushi] = useState<any>()

  // @ts-ignore
  window.sushi = sushi
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const sushiLib = new Sushi(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setSushi(sushiLib)
      window.sushisauce = sushiLib
    }
  }, [ethereum])

  return <Context.Provider value={{ sushi }}>{children}</Context.Provider>
}

export default HoneyProvider
