import { InventoryCell } from './ui'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from "../types"
import { useContext, useRef } from 'react'
import { UserPositionContext } from '../../context/UserPositionContext'
import Image from 'next/image'

/* eslint-disable @next/next/no-img-element */
export default function UserCell(props) {
  const { nft, x, y } = props
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
    <InventoryCell
      ref={drag(drop(ref))}
      className="inventory-cell"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      { doesPositionHaveItem(x, y) && <Image
        src={`/${nft.token_id}.png`}
        alt={''}
        height="36px"
        width="36px"
      />}
    </InventoryCell>
  )

}