import hausIcon from '../assets/img/haus__icon.png'
import hausEthIcon from '../assets/img/haus-eth__icon.png'

const FARM_ID = {
  SHOGUN: 'fHAUS-WETH UNI-V2 LP',
  RONAN: 'fHAUS-undefined UNI-V2 LP',
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
  p1: 'Stake $HAUS/ETH Uni LP',
  p2: 'Get 2x Rewards, Soft Signaling',
  subtitle: 'Stake HAUS/ETH UNI V2 LP to earn more HAUS',
  icon: hausEthIcon,
  earnToken: 'HAUS',
  stakeToken: 'ETH/HAUS',
  url: 'google.com',
}
const ronan = {
  name: 'Ronan',
  p1: 'Stake $HAUS on your own',
  p2: 'Get 1x rewards, Soft Signaling',
  subtitle: 'Stake HAUS to earn more HAUS',
  icon: hausIcon,
  earnToken: 'HAUS',
  stakeToken: 'HAUS',
  url: 'google.com',
}

export const getHardCodedData = (farm: any): PoolData => {
  if (farm?.id === FARM_ID.SHOGUN || farm === FARM_ID.SHOGUN) {
    return shogun
  } else if (farm?.id === FARM_ID.RONAN || farm === FARM_ID.RONAN) {
    return ronan
  } else {
    return { ...farm, description: 'No description', icon: null }
  }
}

export const replacePoolName = (str: string): string => {
  if (/FHAUS-UNDEFINED UNI-V2 LP/gi.test(str)) {
    return str.replace(/FHAUS-UNDEFINED UNI-V2 LP/gi, 'Ronan')
  } else if (/fHAUS-WETH UNI-V2 LP/gi.test(str)) {
    return str.replace(/fHAUS-WETH UNI-V2 LP/gi, 'Shogun')
  } else if (/fHAUS-undefined/gi.test(str)) {
    return str.replace(/fHAUS-undefined/gi, 'Ronan')
  } else if (/fHAUS-weth/gi.test(str)) {
    return str.replace(/fHAUS-weth/gi, 'Shogun')
  } else if (/fHAUS/gi.test(str)) {
    return str.replace(/fHAUS/gi, 'Haus')
  } else {
    return str
  }
}
