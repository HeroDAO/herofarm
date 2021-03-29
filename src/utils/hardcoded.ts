import hausIcon from '../assets/img/haus__icon.png'
import hausEthIcon from '../assets/img/haus-eth__icon.png'

const FARM_ID = {
  // SHOGUN: 'fHAUS-WETH UNI-V2 LP',
  // RONIN: 'fHAUS-undefined UNI-V2 LP',
  SHOGUN: 'HAUS-XDAI UNI-V2 LP',
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
  name: 'Shogun',
  p1: 'Stake XDAI/HAUS Pool Tokens',
  p2: 'Get 2x HAUS Rewards, Signal Governance',
  subtitle: 'Stake XDAI/HAUS Pool Tokens to earn more HAUS',
  icon: hausEthIcon,
  earnToken: 'HAUS',
  stakeToken: 'XDAI/HAUS',
  url: 'google.com',
}

const ronin = {
  name: 'Ronin',
  p1: 'Stake HAUS',
  p2: 'Get 1x HAUS rewards, Signal Governance',
  subtitle: 'Stake HAUS to earn more HAUS',
  icon: hausIcon,
  earnToken: 'HAUS',
  stakeToken: 'HAUS',
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
