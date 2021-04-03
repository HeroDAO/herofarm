import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import HoneyProvider from './contexts/HoneyProvider'
import TokensProvider from './contexts/Tokens'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import styled from 'styled-components'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <StyledBackground>
          <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
          <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
          </Switch>
        </StyledBackground>
      </Router>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={100}
        // chainId={42}
      >
        <HoneyProvider>
          <TransactionProvider>
            <TokensProvider>
              <FarmsProvider>
                <ModalsProvider>{children}</ModalsProvider>
              </FarmsProvider>
            </TokensProvider>
          </TransactionProvider>
        </HoneyProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const StyledBackground = styled.div`
  background: linear-gradient(111.63deg, #03061b 0%, #0E1235 49.48%, #0E1235 100%);
`

export default App
