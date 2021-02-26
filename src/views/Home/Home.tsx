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
        subtitle="Welcome to our humble FarmHaus"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="Back to DAOhaus" href="https://app.daohaus.club" variant="default" />
      </div>
    </Page>
  )
}

export default Home
