import { useContext } from "react"
import { TradeContext } from "../../context/TradeContext"

export default function ClearOrder() {
  const { clearTrade } = useContext(TradeContext)
  return (
    <button className="clear-order"
      onClick={() => {
        clearTrade()
      }}
    >
      Clear Order
    </button>
  )
}