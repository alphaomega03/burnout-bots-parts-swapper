/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from "react"
import { CONTRACT_ADDRESS, IPFS_IMAGE_BASE_URI } from "../consts"
import { NFTContext } from "../context/NFTContext"
import { TradeContext } from "../context/TradeContext"
import '../styles/Inventory.module.css'
import { InventoryTable, InventoryRow, InventoryCell } from './inventory/ui'

export default function AvailableTrades() {

  const { nfts, doesUserOwnTokenId } = useContext(NFTContext)
  const { setAskTokenId, askTokenId } = useContext(TradeContext)

  console.log('askTokenId', askTokenId)

// const onPartClick 
  
  return (
    <InventoryTable className="inventory-table">
      <InventoryRow className="inventory-row"> 
        <InventoryCell
          className="inventory-cell"
          style={{  opacity: doesUserOwnTokenId('0') ?  1 : 0.5 }}
          onClick={ doesUserOwnTokenId('0') ? () => setAskTokenId('0') : undefined}
        >
          <img
            src={`0.png`}
            alt={''}
            height="36px"
            width="36px"
          />
        </InventoryCell> 
      </InventoryRow>
      <InventoryRow className="inventory-row"> 
        <InventoryCell
          className="inventory-cell"
          style={{  opacity: doesUserOwnTokenId('1') ?  1 : 0.5 }}
          onClick={ doesUserOwnTokenId('1') ? () => setAskTokenId('1') : undefined}
        >
          <img
            src={`1.png`}
            alt={''}
            height="36px"
            width="36px"
          />
        </InventoryCell>
      </InventoryRow>
      <InventoryRow className="inventory-row"> 
        <InventoryCell
          className="inventory-cell"
          style={{  opacity: doesUserOwnTokenId('2') ?  1 : 0.5 }}
          onClick={ doesUserOwnTokenId('2') ? () => setAskTokenId('2') : undefined}
        >
          <img
            src={`2.png`}
            alt={''}
            height="36px"
            width="36px"
          />
        </InventoryCell>
      </InventoryRow>
      <InventoryRow className="inventory-row"> 
        <InventoryCell
          className="inventory-cell"
          style={{  opacity: doesUserOwnTokenId('3') ?  1 : 0.5 }}
          onClick={ doesUserOwnTokenId('3') ? () => setAskTokenId('3') : undefined}
        >
          <img
            src={`3.png`}
            alt={''}
            height="36px"
            width="36px"
          />
        </InventoryCell>
      </InventoryRow>
    </InventoryTable>
  )
}