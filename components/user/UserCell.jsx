import { ItemTypes } from "../types";
import { useContext, useState, useRef } from 'react'
import { PositionContext } from '../../context/PositionContext'
import { useDrop, useDrag, DragPreviewImage } from 'react-dnd'
import { TradeContext } from '../../context/TradeContext'
import { UserPositionContext } from '../../context/UserPositionContext'
import Image from "next/image";

export default function  UserCell({ nft, x, y }) {
  const { doesPositionHaveItem, addTradeItemToInventory } = useContext(UserPositionContext)
  const ref = useRef(null)

  const [{isDragging}, drag, preview] = useDrag(() => {
    return {
      type: ItemTypes.PART,
      item: { type: ItemTypes.PART, x: x, y: y, nft: nft, isFromTradeWindow: false },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
        item: monitor.getItem()
      })
    }
  })

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.PART,
      drop: monitor => {        
        if(monitor.isFromTradeWindow) {
          addTradeItemToInventory({ x: monitor.x, y: monitor.y }, {x, y})
        } 
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    })
  )

  return (
    <div
      ref={(drag(drop(ref)))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`user-cell-item-${x+1}`}
    >
      <DragPreviewImage src={``}/>
      {doesPositionHaveItem(x, y) && <Image
        src={`/${nft.token_id}.png`}
        alt={''}
        height="36px"
        width="36px"
      />}

    </div>
  )
}