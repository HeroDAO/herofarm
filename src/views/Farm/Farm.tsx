import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useSushi from '../../hooks/useSushi'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Countdown from '../../components/Countdown'
import useFarm from '../../hooks/useFarm'
import useTokenBalance from '../../hooks/useTokenBalance'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { formatAddress } from '../../utils'
import { lpTokenValue } from '../../utils/lpToken'
import { getFactoryContract } from '../../sushi/utils'

const Farm: React.FC = () => {
  const { farmId } = useParams()
  const {
    lpToken,
    earnToken,
    name,
    icon,
    lpContract,
    poolContract,
    // verified
  } = useFarm(farmId) || {
    lpToken: '',
    earnToken: '',
    name: '',
    icon: '',
    poolContract: null,
    lpContract: null,
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  const sushi = useSushi()
  const factoryContract = getFactoryContract(sushi)
  const [fundingAddress, setFundingAddress] = useState(null)

  useEffect(() => {
    if (!factoryContract || !lpContract) return

    const fetchFundingAddress = async () => {
      const { proxy } = await factoryContract.methods.pools(lpContract.options.address).call()
      setFundingAddress(proxy)
    }

    fetchFundingAddress()
  }, [sushi, factoryContract, lpContract])

  const stakedBalance = useTokenBalance(poolContract?.options?.address)

  const [lpTokenPrice, setLpTokenPrice] = useState<BigNumber | null>(null)
  useEffect(() => {
    if (!lpContract) return

    const fetchLpTokenPrice = async () => {
      setLpTokenPrice(await lpTokenValue(lpContract))
    }

    fetchLpTokenPrice()
  }, [lpContract])

  const [farmingPeriodEnd, setFarmingPeriodEnd] = useState(null)
  useEffect(() => {
    async function fetchPeriodFinish () {
      setFarmingPeriodEnd(await poolContract.methods.periodFinish().call())
    }

    if (poolContract) {
      fetchPeriodFinish()
    }
  }, [poolContract])

  return (
    <>
      <PageHeader
        circle
        icon={icon}
        subtitle={`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`}
        title={name}
      />
      {/* {!verified && <React.Fragment>
        <StakeDisclaimer>
          The tokens for this farm are not in the default Honeyswap token list.
          <br /><br />
          Only interact with this farm if you know what you are doing.
        </StakeDisclaimer>
        <Spacer size="md" />
      </React.Fragment>} */}
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest poolContract={poolContract} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              lpContract={lpContract}
              poolContract={poolContract}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="md" />
        <StyledAddresses>
          <div>
            <div>Time remaining in farming period</div>
            <div>
              {farmingPeriodEnd ? (
                <Countdown deadline={farmingPeriodEnd} />
              ) : 'Loading...'}
            </div>
          </div>
          <div>
            <div>Price per LP token</div>
            <div>
              {lpTokenPrice ? `$${lpTokenPrice.toFixed(2)}` : 'Loading...'}
            </div>
          </div>
          <div>
            <div>Price for your staked LP tokens</div>
            <div>
              {lpTokenPrice ? `$${lpTokenPrice.times(stakedBalance.div('1e18')).toFixed(2)}` : 'Loading...'}
            </div>
          </div>
          <div>
            <div>Funding address (do <b>NOT</b> send your LP tokens here)</div>
            <a href={`https://blockscout.com/address/${fundingAddress}`}>
              {fundingAddress ? formatAddress(fundingAddress) : 'Loading...'}
            </a>
          </div>
        </StyledAddresses>
      </StyledFarm>
    </>
  )
}

const StyledAddresses = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: rgba(255,255,255,0.85);
  font-family: Overpass;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 80%;
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: .5em;
    align-items: center;
  }

  a {
    color: #2C3437;
    text-decoration: none;
    padding: 0 12px;
    border-radius: 4px;
    background-color: #fff;
  }
`

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

// const StakeDisclaimer = styled.div`
//   max-width: 900px;
//   margin: 0 auto;
//   padding: 10px;
//   background: ${({ theme }) => theme.color.red[500]};
//   color: #fff;
//   a {
//     font-weight: 500;
//     color: #fff;
//   }
// `

export default Farm
