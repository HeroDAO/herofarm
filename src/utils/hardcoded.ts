import hausIcon from '../assets/img/haus__icon.png'
import hausEthIcon from '../assets/img/haus-eth__icon.png'

const name1 = "Name 1";
const name2 = "Name 2";
const name3 = "Name 3"
 
export const getHardCodedData = (farm: any): { name: string; description: string; icon: any } => {
  if (farm.id === 'fHAUS-WETH UNI-V2 LP') {
    return {
      ...farm,
      name: name2,
      description: 'Description 2',
      icon: hausEthIcon,
    }
  } else if (farm.id === 'fHAUS-undefined UNI-V2 LP') {
    return {
      ...farm,
      name: name1,
      description: 'Description 1',
      icon: hausIcon,
    }
  } else {
    return { ...farm, description: 'No description' }
  }
}


export const replacePoolName = (str: string):string => {
  if (/FHAUS-UNDEFINED UNI-V2 LP/gi.test(str)) {
  return str.replace(/FHAUS-UNDEFINED UNI-V2 LP/gi, name1)
} 
else if ((/fHAUS-WETH UNI-V2 LP/gi.test(str))) {
  return str.replace(/fHAUS-WETH UNI-V2 LP/gi, name2)
}
else if(/fHAUS-undefined/gi.test(str)) {
  return str.replace(/fHAUS-undefined/gi, name1)
} 
else if(/fHAUS-weth/gi.test(str)){
  return str.replace(/fHAUS-weth/gi, name2)
}
else if(/fHAUS/gi.test(str)){
  return str.replace(/fHAUS/gi, name3)
}
 else {
  return str
}
}