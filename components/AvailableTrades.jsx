/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from "react"
import { CONTRACT_ADDRESS, IPFS_IMAGE_BASE_URI } from "../consts"
import { NFTContext } from "../context/NFTContext"
import { TradeContext } from "../context/TradeContext"
import '../styles/Inventory.module.css'
import { InventoryTable, InventoryRow, InventoryCell } from './inventory/ui'
import Cell from './inventory/Cell'
import { PositionContext } from "../context/PositionContext"

export default function AvailableTrades() {

  const { doesUserOwnTokenId, getNFTsFromWallet, setNFTs } = useContext(NFTContext)
  const { setAskTokenId, askTokenId } = useContext(TradeContext)

  const { addInventoryItem } = useContext(PositionContext)

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      addInventoryItem(i, 0)      
    }
  }, [])


  
  return (
    <InventoryTable className="inventory-table">
      <InventoryRow className="inventory-row"> 
        <Cell
          className="inventory-cell"
          style={{  opacity: doesUserOwnTokenId('1') ?  1 : 0.5 }}
          x={0}
          y={0}
          nft={{ token_id: '0'}}
        />
        <Cell
          className="inventory-cell"
          style={{  opacity: doesUserOwnTokenId('1') ?  1 : 0.5 }}
          x={1}
          y={0}
          nft={{ token_id: '1'}}
        />
        <Cell
          className="inventory-cell"
          style={{  opacity: doesUserOwnTokenId('1') ?  1 : 0.5 }}
          x={2}
          y={0}
          nft={{ token_id: '2'}}
        />
        <Cell
          className="inventory-cell"
          style={{  opacity: doesUserOwnTokenId('1') ?  1 : 0.5 }}
          x={3}
          y={0}
          nft={{ token_id: '3'}}
        />
      </InventoryRow>
    </InventoryTable>
  )
}