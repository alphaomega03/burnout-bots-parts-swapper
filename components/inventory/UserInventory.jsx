import { UserItemsContainer, UserTradeWindowContainer } from '../ui'
import Inventory from './Inventory'

export default function UserInventory() {
  return (
    <UserItemsContainer direction="vertical">
      <UserTradeWindowContainer x={0} y={0} />
      <Inventory/>
    </UserItemsContainer>
  )
}