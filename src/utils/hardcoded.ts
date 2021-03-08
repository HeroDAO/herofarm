import hausIcon from '../assets/img/haus__icon.png'
import hausEthIcon from '../assets/img/haus-eth__icon.png'

interface PoolData {
  name: string
  p1: string
  p2: string
  icon: any
}

const shogun = {
  name: 'Shogun',
  p1: 'Stake $HAUS/ETH Uni LP',
  p2: 'Get 2x Rewards, Soft Signaling',
  icon: hausEthIcon,
}
const ronan = {
  name: 'Ronan',
  p1: 'Stake $HAUS on your own',
  p2: 'Get 1x rewards, Soft Signaling',
  icon: hausIcon,
}

export const getHardCodedData = (farm: any): PoolData => {
  if (farm.id === 'fHAUS-WETH UNI-V2 LP') {
    return {
      ...farm,
      ...shogun,
    }
  } else if (farm.id === 'fHAUS-undefined UNI-V2 LP') {
    return {
      ...farm,
      ...ronan,
    }
  } else {
    return { ...farm, description: 'No description' }
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
