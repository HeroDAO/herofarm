import hausIcon from '../assets/img/haus__icon.png'
import hausEthIcon from '../assets/img/haus-eth__icon.png'

const FARM_ID = {
  // SHOGUN: 'fHAUS-WETH UNI-V2 LP',
  // RONIN: 'fHAUS-undefined UNI-V2 LP',
  SHOGUN: 'trash-WXDAI UNI-V2 LP',
  RONIN: 'trash-undefined UNI-V2 LP',
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
  p1: 'Stake WXDAI/HAUS Pool Tokens',
  p2: 'Get 2x HAUS Rewards, Signal Governance',
  subtitle: 'Stake WXDAI/HAUS Pool Tokens to earn more HAUS',
  icon: hausEthIcon,
  earnToken: 'HAUS',
  stakeToken: 'WXDAI/HAUS',
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
  if (/trash-UNDEFINED UNI-V2 LP/gi.test(str)) {
    return str.replace(/trash-UNDEFINED UNI-V2 LP/gi, 'HAUS')
  } else if (/trash-WXDAI UNI-V2 LP/gi.test(str)) {
    return str.replace(/trash-WXDAI UNI-V2 LP/gi, 'WXDAI/HAUS Pool Tokens')
  } else if (/trash-undefined/gi.test(str)) {
    return str.replace(/trash-undefined/gi, 'HAUS')
  } else if (/trash-wxdai/gi.test(str)) {
    return str.replace(/trash-wxdai/gi, 'WXDAI/HAUS Pool Tokens')
  } else if (/trash/gi.test(str)) {
    return str.replace(/trash/gi, 'Haus')
  } else {
    return str
  }
}
