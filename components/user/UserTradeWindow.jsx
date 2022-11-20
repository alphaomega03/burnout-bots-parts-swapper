import { useContext, useRef, useState } from "react"
import { useDrop, useDrag, DragPreviewImage } from "react-dnd"
import { TradeContext } from "../../context/TradeContext"
import { UserPositionContext } from "../../context/UserPositionContext"
import { ItemTypes } from "../types"

export default function UserTradeWindow({ x, y }) {

  const { doesTradePositionHaveItem, addItemToTradeWindow } = useContext(UserPositionContext)
  const { setBidTokenId } = useContext(TradeContext)
  const [ currentNft, setCurrentNft ] = useState(undefined)
  const ref = useRef(null)

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.PART,
      drop: monitor => {
        addItemToTradeWindow({x: monitor.x, y: monitor.y}, {x: x, y: y})
        setCurrentNft(monitor.nft)
        setBidTokenId(monitor.nft.token_id)
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
      className="user-trade-window"
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