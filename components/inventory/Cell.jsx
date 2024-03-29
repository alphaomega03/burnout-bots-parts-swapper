import { InventoryCell } from './ui'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from "../types"
import { useContext, useEffect, useRef } from 'react'
import { PositionContext} from '../../context/PositionContext'
import { NFTContext } from '../../context/NFTContext'
import { useMoralisWeb3Api } from "react-moralis"


/* eslint-disable @next/next/no-img-element */
export default function Cell(props) {
  const Web3Api = useMoralisWeb3Api()

  const { nft, x, y } = props
  const { doesPositionHaveItem, addTradeItemToInventory } = useContext(PositionContext)
  const { doesUserOwnTokenId, nfts } = useContext(NFTContext)
  const ref = useRef(null)


  const [{isDragging}, drag, preview, canDrag] = useDrag(() => {
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
      style={{ opacity: (isDragging || doesUserOwnTokenId(nft.token_id)) ? 0.5 : 1,
        pointerEvents: doesUserOwnTokenId(nft.token_id) ? 'none' : 'auto'
      }}
    >
      { doesPositionHaveItem(x, y) && <img
        src={`${nft.token_id}.png`}
        alt={''}
        height="36px"
        width="36px"
      />}
    </InventoryCell>
  )

}