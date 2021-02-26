import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useHoney from '../../../hooks/useSushi'
import { getSushiAddress as getHoneyAddress } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import HausAvatar from '../../../assets/img/haus__avatar.png'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const honey = useHoney()
  const honeyBalance = useTokenBalance(getHoneyAddress(honey))

  return (
    <Modal>
      <ModalTitle text="My Account" />
      <ModalContent>
        <Spacer />
        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <img src={HausAvatar} alt="" height="80" />
            </CardIcon>
            <StyledBalance>
              <Value value={getBalanceNumber(honeyBalance)} />
              <Label text="HAUS Balance" />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <Button
          href={`https://blockscout.com/poa/xdai/address/${account}`}
          text="View on Blockscout"
        />
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          text="Sign out"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" variant="secondary" />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
