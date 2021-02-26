import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import HausIcon from '../../../assets/img/haus__icon.png'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useHoney from '../../../hooks/useSushi'
import { getSushiAddress, getSushiSupply } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { palette } from '../../../theme/colors'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning, end])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={6}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const honey = useHoney()
  const honeyBalance = useTokenBalance(getSushiAddress(honey))
  const { account }: { account: any } = useWallet()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getSushiSupply(honey)
      setTotalSupply(supply)
    }
    if (account && getSushiAddress(honey)) {
      fetchTotalSupply()
    }
  }, [honey, account])

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <StyledRow>
                <img src={HausIcon} alt="" width="48px" />
                <Spacer />
                <div style={{ flex: 1 }}>
                  <Label text="Your HAUS Balance" />
                  <Value
                    value={!!account ? getBalanceNumber(honeyBalance) : 'Locked'}
                    decimals={6}
                  />
                </div>
              </StyledRow>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending harvest
          <FootnoteValue>
            <PendingRewards /> HAUS
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <StyledBalance>
          <StyledRow>
            <img src={HausIcon} alt="" width="48px" />
            <Spacer />
            <div style={{ flex: 1 }}>
              <Label text="Total HAUS Supply" />
              <Value
                value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
              />
            </div>
          </StyledRow>
          </StyledBalance>
        </CardContent>
      </Card>
    </StyledWrapper>
  )
}

const StyledRow = styled.div`
  display: flex;
  align-items: center;
`

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: #ffffff;
  border-top: solid 1px ${palette['orange']};
`
const FootnoteValue = styled.div`
  font-family: 'Overpass', sans-serif;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
  color: '#ffffff'
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
`

export default Balances
