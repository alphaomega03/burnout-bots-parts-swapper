import { useContext, useEffect } from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import { TradeContext } from '../context/TradeContext'
import Orders from './orders/Orders'
import { NFTContext } from '../context/NFTContext'
import { UserPositionContext } from '../context/UserPositionContext'
import { OrderContext } from '../context/OrderContext'
import TradeContainer from './containers/TradeContainer'
import UserContainer from './containers/UserContainer'
import TradeControlsContainer from './containers/TradeControlsContainer'
import TradePartnerContainer from './containers/TradePartnerContainer'
import UserInventoryContainer from './containers/UserInventoryContainer'
import TradePartnerInventoryContainer from './containers/TradePartnerInventoryContainer'
import TradeControls from './trade-controls/TradeControls'
import { MainContainer } from './ui'

export default function Trade() {
  const { isOrderReadyToSubmit } = useContext(TradeContext)
    return (
      <div className="main">
        <MainContainer direction="vertical">
          <TradeContainer>
            <UserContainer>
              <UserInventoryContainer />
            </UserContainer>
            <TradeControlsContainer>
              <TradeControls />
            </TradeControlsContainer>
            <TradePartnerContainer>
              <TradePartnerInventoryContainer />
            </TradePartnerContainer>
          </TradeContainer>
          <Orders />
        </MainContainer>

      </div>
    )
}