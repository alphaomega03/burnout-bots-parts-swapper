import TradePartnerInventory from "../trade-partner/TradePartnerInventory";
import TradePartnerWindow from "../trade-partner/TradePartnerWindow";

export default function TradePartnerInventoryContainer() {
  return (
    <div  className="trade-partner-inventory-container">
      <TradePartnerWindow />
      <TradePartnerInventory/>
    </div>
  )
}