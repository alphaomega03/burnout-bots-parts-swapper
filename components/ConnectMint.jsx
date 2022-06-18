import { useContext } from 'react'
import { useMoralis } from 'react-moralis'
import Account from '../lib/src/components/Account/Account'
import AccountLoggedIn from '../lib/src/components/Account/AccountLoggedIn'
import Swap from './Swap'
import { StyledSpace, StyledTradeWindow, FormSpace } from './ui'
import Inventory from './inventory/Inventory'
import AvailableTrades from './AvailableTrades'
import { InventoryCell } from './inventory/ui'
import { Button, Space, Input } from 'antd'
import { TradeContext } from '../context/TradeContext'
import Link from 'next/link'
import Orders from './orders/Orders'


export default function ConnectMint() {
  const { account, enableWeb3 } = useMoralis()
  const { isOrderReadyToSubmit, recipientAddress, setRecipientAddress, submitOrder } = useContext(TradeContext)
  const isLoggedIn = account !== null

  const isSubmitDisabled = !isOrderReadyToSubmit()
  if(isLoggedIn) {
    return (
      <div>
        <AccountLoggedIn />
        {/* <Swap /> */}
        <Space direction ="vertical">
          <StyledSpace direction='horizontal'>
            <Inventory/>
            <StyledTradeWindow x={0} y={0} />
            <AvailableTrades />
          </StyledSpace>
          <FormSpace direction="vertical">
            <Input
              placeholder='Enter recipient ETH address'
              onChange={(e) => setRecipientAddress(e.target.value)}
            >
            </Input>
            <Button
              type="primary"
              disabled={isSubmitDisabled}
              onClick={async () => {
                const moralis = await enableWeb3()
                const signer = moralis.getSigner()
                submitOrder(account, signer)
              }}
            >
              Submit Order
            </Button>
          </FormSpace>
        </Space>
        <Orders />
      </div>
    )
  } else {
    return (
      <Account />
    )
  }
}