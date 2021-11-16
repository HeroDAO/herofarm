import herodao_logo from '../assets/img/herodao_logo.png'
import heroeth_icon from '../assets/img/herodaoeth_icon.svg'

const FARM_ID = {
  // SHOGUN: 'fHAUS-WETH UNI-V2 LP',
  // RONIN: 'fHAUS-undefined UNI-V2 LP',
  SHOGUN: 'HAUS-WXDAI UNI-V2 LP',
  RONIN: 'HAUS-undefined UNI-V2 LP',
}

interface PoolData {
  name: string
  p1: string
  p2: string
  icon: any
  earnToken?: string
  stakeToken?: string
  url?: string
  subtitle?: string
}

const shogun = {
  name: 'Hero',
  p1: 'Stake ETH/MOONROCK Pool Tokens',
  p2: 'Get 2x MOONROCK Rewards, Signal Governance',
  subtitle: 'Stake ETH/MOONROCK Pool Tokens to earn more MOONROCK',
  icon: heroeth_icon,
  earnToken: 'MOONROCK',
  stakeToken: 'ETH/MOONROCK',
  url: 'google.com',
}

const ronin = {
  name: 'Sidekick',
  p1: 'Stake MOONROCK',
  p2: 'Get 1x MOONROCK rewards, Signal Governance',
  subtitle: 'Stake MOONROCK to particiapte in Snapshot signaling',
  icon: herodao_logo,
  earnToken: 'MOONROCK',
  stakeToken: 'MOONROCK',
  url: 'google.com',
}

export const getHardCodedData = (farm: any): PoolData => {
  if (farm?.id === FARM_ID.SHOGUN || farm === FARM_ID.SHOGUN) {
    return shogun
  } else if (farm?.id === FARM_ID.RONIN || farm === FARM_ID.RONIN) {
    return ronin
  } else {
    return { ...farm, description: 'No description', icon: null }
  }
}

export const replacePoolName = (str: string): string => {
  if (/HAUS-UNDEFINED UNI-V2 LP/gi.test(str)) {
    return str.replace(/HAUS-UNDEFINED UNI-V2 LP/gi, 'HAUS')
  } else if (/HAUS-WXDAI UNI-V2 LP/gi.test(str)) {
    return str.replace(/HAUS-WXDAI UNI-V2 LP/gi, 'XDAI/HAUS Pool Tokens')
  } else if (/HAUS-undefined/gi.test(str)) {
    return str.replace(/HAUS-undefined/gi, 'HAUS')
  } else if (/HAUS-wxdai/gi.test(str)) {
    return str.replace(/HAUS-wxdai/gi, 'XDAI/HAUS Pool Tokens')
  } else if (/HAUS/gi.test(str)) {
    return str.replace(/HAUS/gi, 'Haus')
  } else {
    return str
  }
}
