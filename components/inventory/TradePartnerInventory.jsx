import { TradePartnerItemsContainer, TradeWindowContainer } from '../ui'
import Inventory from './Inventory'
import AvailableTrades from '../AvailableTrades'

export default function TradePartnerInventory() {
  return (
    <TradePartnerItemsContainer direction="vertical">
      <TradeWindowContainer x={0} y={0} />
      <AvailableTrades />
    </TradePartnerItemsContainer>
  )
}