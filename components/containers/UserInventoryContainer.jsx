import UserInventory from "../user/UserInventory";
import UserTradeWindow from "../user/UserTradeWindow";

export default function UserInventoryContainer() {
  return (
    <div className="user-inventory-container">
      <UserTradeWindow />
      <UserInventory />
    </div>
  )
}