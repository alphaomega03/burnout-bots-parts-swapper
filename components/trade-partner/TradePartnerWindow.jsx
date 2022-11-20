import { useContext, useRef, useState } from "react";
import { DragPreviewImage, useDrag, useDrop } from "react-dnd";
import { PositionContext } from "../../context/PositionContext";
import { TradeContext } from "../../context/TradeContext";
import { ItemTypes } from "../types";

export default function TradePartnerWindow({ x, y }) {
  const { doesTradePositionHaveItem, addItemToTradeWindow } = useContext(PositionContext)
  const { setAskTokenId } = useContext(TradeContext)
  const [ currentNft, setCurrentNft ] = useState(undefined)
  const ref = useRef(null)

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.PART,
      drop: monitor => {
        addItemToTradeWindow({x: monitor.x, y: monitor.y}, {x: x, y: y})
        setCurrentNft(monitor.nft)
        setAskTokenId(monitor.nft.token_id.toString())
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    []
  )

  const [{isDragging}, drag, preview] = useDrag(() => {
    return {
      type: ItemTypes.PART,
      item: { type: ItemTypes.PART, x: x, y: y, nft: currentNft, isFromTradeWindow: true },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
        item: monitor.getItem()
      })
    }
  })

  return (
    <div
    ref={drag(drop(ref))}
      className="trade-partner-trade-window"
    >
      <DragPreviewImage src={`${currentNft && currentNft.token_id}_36x36.png`} connect={preview}/>
      {doesTradePositionHaveItem(x, y) && <img
        src={`${currentNft && currentNft.token_id}.png`}
        alt={''}
        height="36px"
        width="36px"
      />}
    </div>
  )

}