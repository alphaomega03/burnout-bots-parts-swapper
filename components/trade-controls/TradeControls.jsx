import ClearOrder from "./ClearOrder";
import SubmitOrder from "./SubmitOrder";
import TradePartnerAddress from "./TradePartnerAddress";

export default function TradeControls() {
  return (
    <div className="flex justify-evenly content-center items-center trade-controls flex-col">
      <TradePartnerAddress />
      <SubmitOrder />
      <ClearOrder />
    </div>
  )
}