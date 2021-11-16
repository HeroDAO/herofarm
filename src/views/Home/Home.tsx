import React from 'react'
import HausType from '../../assets/img/haus__hugeType.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={HausType} height={80} alt="farmHaus" />}
        title=""
        subtitle="Welcome to the Hero Farm. Do you have what it takes to be a Hero?"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          width: '30%',
          padding: '0 10%',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '40%' }}>
          <Button
            text="Go to Sushiswap"
            href="https://app.honeyswap.org"
            className="outline honeyswap"
          />
        </div>
        <div style={{ width: '40%' }}>
          <Button text="Go to Farms" to="/farms" variant="default" />
        </div>
      </div>
    </Page>
  )
}

export default Home
