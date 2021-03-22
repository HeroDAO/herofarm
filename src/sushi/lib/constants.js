import React from 'react'
import BigNumber from 'bignumber.js/bignumber'
//import roseFlower from '../../assets/img/rose_flower.svg'
import agave from '../../assets/img/agave.svg'
import birch from '../../assets/img/birch.svg'
import blueFlower from '../../assets/img/blue_flower.svg'
import blueGreenTree from '../../assets/img/blue_green_tree.svg'
import greenFlower from '../../assets/img/green_flower.svg'
import carnationFlower from '../../assets/img/carnation_flower.svg'
import creamFlower from '../../assets/img/cream_flower.svg'
import elderberryTree from '../../assets/img/elderberry_tree.svg'
import evergladesPalm from '../../assets/img/everglades_palm.svg'
import giantRedwood from '../../assets/img/giant_redwood.svg'
import lilyValley from '../../assets/img/lily_valley.svg'
import lunaria from '../../assets/img/lunaria.svg'
import lychee from '../../assets/img/lychee.svg'
import orchid from '../../assets/img/orchid.svg'
import silverbell from '../../assets/img/silverbell.svg'
import strongbark from '../../assets/img/strongbark.svg'
import ursinia from '../../assets/img/ursinia.svg'
import yellowSunflower from '../../assets/img/sunflower.svg'
import whitebeam from '../../assets/img/whitebeam.svg'
import winterbloom from '../../assets/img/winterbloom.svg'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const contractAddresses = {
  sushi: {
    100: '0xb0c5f3100a4d9d9532a4cfd68c55f1ae8da987eb',
    42: '0xAb5cC910998Ab6285B4618562F1e17f3728af662',
  },
  weth: {
    100: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
    42: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  },
  factory: {
    100: '0xeB7611B7DBA0ad92e2668C1b9Ba876dEfaf27ecD',
    42: '0xd069B4d325A736a1D42ce344d3B92827718625A0',
  },
}

/*
 * UNI-V2 LP Address on xDai
 * ==========================================
 * HNY/WXDAI  0x4505b262dc053998c10685dc5f9098af8ae5c8ad
 * HNY/STAKE  0x298c7326a6e4a6108b88520f285c7dc89403347d
 * HNY/WETH   0x89e2f342b411032a580fefa17f96da6a5bef4112
 */

export const knownPools = {
  '0x8520fc4c282342f8e746b881b9b60c14f96a0fab': {
    name: 'Dai Daisies',
    icon: <img src={creamFlower} alt="" />,
  },
  '0xa6c55971f21cc1c35ea617f47980d669a0c09cf3': {
    name: 'STAKE Sunflower',
    icon: <img src={yellowSunflower} alt="" />,
  },
  '0x0de3239086dbf7edf17805107cae89b0c1a2db37': {
    name: 'Ether Eucalyptus',
    icon: <img src={greenFlower} alt="" />,
  },
  '0x704876d066cded601f668ee2da0519da465cbf93': {
    name: 'Bitcoin Birch',
    icon: <img src={birch} alt="" />,
  },
  '0xadcd8e1699158627f072b080528f0ea6d020e46a': {
    name: 'Wrapped Willow',
    icon: <img src={blueGreenTree} alt="" />,
  },
  '0x90d029ddbf3fb4662eceefb7f31d052f4e07856e': {
    name: 'Link Linum',
    icon: <img src={blueFlower} alt="" />,
  },
  '0x836764fc9f0447aff1ffc59e6d9b13c7644b4357': {
    name: 'Bitcoin Buttercup',
    icon: <img src={carnationFlower} alt="" />,
  },
  '0xf26ee9b4840c6b9a17e923ac38c74d678a2fc08a': {
    name: 'EtherGlades Palm',
    icon: <img src={evergladesPalm} alt="" />,
  },
  '0xec01cd2e4d45d3e086cd64940d906a94a2926ab0': {
    name: 'Stake Silverbell',
    icon: <img src={silverbell} alt="" />,
  },
  '0x68272c8873c4fcd9eea472ef363cd3165654c2e4': {
    name: 'Ether Elderberry',
    icon: <img src={elderberryTree} alt="" />,
  },
  '0x179cae1cee04ea46d658990b3a63629ad9a0b3b5': {
    name: 'Tether WhiteBeam',
    icon: <img src={whitebeam} alt="" />,
  },
  '0xec4f558a59a9460bfdeb348ac6661e66019872f7': {
    name: 'Circle WinterBloom',
    icon: <img src={winterbloom} alt="" />,
  },
  '0xb952e96d3e99b00bebdb39b7b100446256790b6f': {
    name: 'Uniswap Ursinia',
    icon: <img src={ursinia} alt="" />,
  },
  '0xd1a941812aac13bf52f54e6eab36437abd0c831a': {
    name: 'Link Lily of the Valley',
    icon: <img src={lilyValley} alt="" />,
  },
  '0x7279d68ab84037a3bbb2509306ff68cbb5986443': {
    name: 'Link Lychee',
    icon: <img src={lychee} alt="" />,
  },
  '0x74f267b4dfe414f493d97eb6012ef1b61306247d': {
    name: 'Xmoon Lunaria',
    icon: <img src={lunaria} alt="" />,
  },
  '0x239d0192f48fddbf592970748bde63615cc91c4f': {
    name: 'OMG Orchid',
    icon: <img src={orchid} alt="" />,
  },
  '0xbe7db1f595b7ec55b5bc87652361dabaac7e8f58': {
    name: 'Synthetix Strongbark',
    icon: <img src={strongbark} alt="" />,
  },
  '0x21766e9bfc48271abb85c5ede57675c908d7c9e9': {
    name: 'Agaave',
    icon: <img src={agave} alt="" />,
  },
  '0x3f283c53c1679d69916d70d79cd3fe6ab7c3e180': {
    name: 'renZEC Redwood',
    icon: <img src={giantRedwood} alt="" />,
  },
}
