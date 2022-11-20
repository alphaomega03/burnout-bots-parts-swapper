import { useContext, useEffect } from "react";
import { NFTContext } from "../../context/NFTContext";
import { PositionContext } from "../../context/PositionContext";
import { TradeContext } from "../../context/TradeContext";
import TradePartnerCell from "./TradePartnerCell";

export default function TradePartnerInventory() {
  const { doesUserOwnTokenId } = useContext(NFTContext)
  const { setAskTokenId, askTokenId } = useContext(TradeContext)

  const { addInventoryItem } = useContext(PositionContext)

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      addInventoryItem(i, 0)      
    }
  }, [])

  const renderCells = () => {
    const cells = []
    for(let i = 0; i < 4; i++) {
      cells.push(
        <div className={`trade-partner-cell-${i+1}`}>
          <TradePartnerCell
            x={i}
            y={0}
            nft={{ token_id: i}}
          />
        </div>
      )
    }

    return cells
  }

  return (
    <div className="trade-partner-trade-items">
      {renderCells()}
    </div>
  )
}