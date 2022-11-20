import { useContext } from "react"
import { useMoralis } from "react-moralis"
import { OrderContext } from "../../context/OrderContext"
import { TradeContext } from "../../context/TradeContext"
import { useAccount, useSigner } from "wagmi"

export default function SubmitOrder() {
  // const { account, enableWeb3 } = useMoralis()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { submitOrder } = useContext(TradeContext)
  const { refreshMakerOrders } = useContext(OrderContext) 
  return (
    <button className="submit-order"
      onClick={async () => {
        submitOrder(address, signer).then((res) => {
          refreshMakerOrders(address)
        })
      }}
    >
      Submit Order
    </button>
  )
}