import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import HausIcon from '../../assets/img/daohaus__icon.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import CreateFarm from '../CreateFarm'
import Farm from '../Farm'

import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={HausIcon} height="95" alt="" />}
                subtitle="Earn HAUS tokens by staking Honeyswap V2 LP Tokens."
                title="Select a farm haus"
              />
              <FarmCards />
            </Route>
            {/* <Route path={`${path}/create`}>
              <CreateFarm />
            </Route> */}
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default Farms
