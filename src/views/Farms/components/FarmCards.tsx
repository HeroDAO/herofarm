import BigNumber from 'bignumber.js'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useSushi from '../../../hooks/useSushi'
import { getSushiAddress } from '../../../sushi/utils'
import useFarms from '../../../hooks/useFarms'
import useTokenPrice from '../../../hooks/useTokenPrice'
import { INTEGERS } from '../../../sushi/lib/constants'
import { lpTokenValue } from '../../../utils/lpToken'
import { getHardCodedData } from '../../../utils/hardcoded'

interface FarmWithApy extends Farm {
  apy: BigNumber
  poolAddress?: string
}

// const curatedActiveFarms = [
//   //EMPTY
//   "no farms are funded atm",
//   // HNY-LINK
//   // "0x90d029ddbf3fb4662eceefb7f31d052f4e07856e",
//   // WETH-WBTC
//   // "0xadcd8e1699158627f072b080528f0ea6d020e46a",
//   // WBTC-XDAI
//   // "0x704876d066cded601f668ee2da0519da465cbf93",
//   // XDAI-HNY
//   // "0x8520fc4c282342f8e746b881b9b60c14f96a0fab",
//   // // STAKE-HNY
//   // "0xa6c55971f21cc1c35ea617f47980d669a0c09cf3",
//   // // ETH-HNY
//   // "0x0de3239086dbf7edf17805107cae89b0c1a2db37",
//   // // WBTC-HNY
//   // "0x836764fc9f0447aff1ffc59e6d9b13c7644b4357",
//   // // WETH-XDAI
//   // "0xf26ee9b4840c6b9a17e923ac38c74d678a2fc08a",
//   // // STAKE-XDAI
//   // "0xec01cd2e4d45d3e086cd64940d906a94a2926ab0",
//   // // WETH-STAKE
//   // "0x68272c8873c4fcd9eea472ef363cd3165654c2e4",
//   // // USDC-XDAI
//   // "0xec4f558a59a9460bfdeb348ac6661e66019872f7",
//   // // USDT-XDAI
//   // "0x179cae1cee04ea46d658990b3a63629ad9a0b3b5",
//   // // UNI-HNY
//   // "0xb952e96d3e99b00bebdb39b7b100446256790b6f",
//   // // WETH-LINK
//   // "0xd1a941812aac13bf52f54e6eab36437abd0c831a",
//   // // LINK-XDAI
//   // "0x7279d68ab84037a3bbb2509306ff68cbb5986443",
//   // // XMOON-HNY
//   // "0x74f267b4dfe414f493d97eb6012ef1b61306247d",
//   // // OMG-XDAI
//   // "0x239d0192f48fddbf592970748bde63615cc91c4f",
//   // // SNX-XDAI
//   // "0xbe7db1f595b7ec55b5bc87652361dabaac7e8f58",
//   // // Aave-XDAI
//   // "0x21766e9bfc48271abb85c5ede57675c908d7c9e9",
//   // // renZEC-XDAI
//   // "0x3f283c53c1679d69916d70d79cd3fe6ab7c3e180",
// ]

const FarmCards: React.FC = () => {
  const farms = useFarms()
  const sushi = useSushi()

  // Get Honey price
  // TODO(onbjerg): We can make this more dynamic
  // by getting the reward token address per pool
  // instead of assuming it is Honey
  const honeyAddress = getSushiAddress(sushi)
  const honeyPrice = useTokenPrice(honeyAddress)

  // Calculate APYs
  const [apy, setApy] = useState<{ [farmId: string]: BigNumber }>({})

  useEffect(() => {
    async function calculateApys() {
      const result: {
        [farmId: string]: BigNumber
      } = {}
      for (const farm of farms) {
        if (farm.rewardRate.isZero()) {
          continue
        }

        console.log('honeyPrice', honeyPrice.toString())
        if (farm.id === "trash-undefined UNI-V2 LP") {
          result[farm.id] = honeyPrice
          .times(farm.rewardRate)
          .times(INTEGERS.ONE_YEAR_IN_SECONDS)
          .div(farm.staked)
          .div(honeyPrice)
          
        } else {
          result[farm.id] = honeyPrice
          .times(farm.rewardRate)
          .times(INTEGERS.ONE_YEAR_IN_SECONDS)
          .div(farm.staked)
          .div(await lpTokenValue(farm.lpContract))
        }
      }
      setApy(result)
    }

    calculateApys()
  }, [farms, honeyPrice])

  // Decorate farms with APYs
  const farmsWithApy = farms
    .map<FarmWithApy>((farm) => ({
      ...farm,
      apy: apy[farm.id],
    }))
    .sort((a, b) => b.rewards.minus(a.rewards).toNumber())

  // const ACTIVE_THRESHOLD = new BigNumber(0.5)

  // Use this when there's active farms
  // const activeFarms = farmsWithApy
  //   .filter((farm) => farm.rewards.gt(ACTIVE_THRESHOLD))
  //   .filter((farm) => curatedActiveFarms.includes(farm.poolAddress))

  // Hotfix until we fix APY calculation
  // const endedRewardsFarms = farmsWithApy
  //   .filter((farm) => farm.rewards.gt(ACTIVE_THRESHOLD))
  //   .filter((farm) => !curatedActiveFarms.includes(farm.poolAddress))

  // const inactiveFarms = farmsWithApy
  //   .filter((farm) => farm.rewards.lt(ACTIVE_THRESHOLD))

  return (
    <StyledCards>
      {farmsWithApy.length ? (
        farmsWithApy.map((farm, i) => <FarmCard farm={farm} key={i} />)
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Loading..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithApy
  // index: Number;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const withHardCoded = getHardCodedData(farm)
  // console.log('farm.apy', farm.apy)
  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>
              <img
                src={withHardCoded?.icon || farm.icon}
                height="95"
                alt="icon"
              />
            </CardIcon>
            <StyledTitle>{withHardCoded?.name || farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail><strong>{withHardCoded?.p1}</strong></StyledDetail>
              <StyledDetail>{withHardCoded?.p2}</StyledDetail>
            </StyledDetails>
            <Spacer />
            <Button text={'Select'} to={`/farms/${farm.id}`} />
            <StyledInsight>
              <span>APY</span>
              <span>
                {farm.apy
                  ? `${farm.apy
                      .times(new BigNumber(100))
                      .toNumber()
                      .toLocaleString('en-US')
                      .slice(0, -1)}%`
                  : '-'}
              </span>
              <span>
                {farm.rewards
                  ? (farm.rewards.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.earnToken}
              </span>
              <span>
                {farm.staked
                  ? (farm.staked.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                LP
              </span>
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

// const FarmSectionHeader = styled.h1`
//   font-family: 'Overpass', sans-serif;
//   color: white;
//   font-size: 32px;
//   font-weight: 400;
//   margin: 0;
//   padding: 0;
// `

// const FarmSectionDescription = styled.p`
//   color: white;
// `

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
  display: flex;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  margin: ${(props) => props.theme.spacing[2]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  margin-top: 0;
  position: relative;
`

const StyledTitle = styled.h4`
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: rgba(255, 255, 255, 0.75);
  font-weight: 200;
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.85);
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  text-align: center;
`

export default FarmCards
