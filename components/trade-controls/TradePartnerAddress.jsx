import { useContext } from "react"
import { TradeContext } from "../../context/TradeContext"

export default function TradePartnerAddress() {
  const { recipientAddress, setRecipientAddress } = useContext(TradeContext)
  return (
    <input className="trade-partner-address"
      value={recipientAddress}
      onChange={(e) => setRecipientAddress(e.target.value)}
    >
    
    </input>
  )
}