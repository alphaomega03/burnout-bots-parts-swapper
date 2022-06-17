/* eslint-disable @next/next/no-img-element */
import { useMoralisWeb3Api } from "react-moralis"
import { useEffect, useState, useContext } from "react"
import { PositionContext } from "../../context/PositionContext"
import { NFTContext } from "../../context/NFTContext"
import { CONTRACT_ADDRESS, IPFS_IMAGE_BASE_URI } from "../../consts"
import '../../styles/Inventory.module.css'
import { InventoryTable, InventoryRow, InventoryCell } from "./ui"
import Image from "next/image"
import { ItemTypes } from "../types"
import { useDrag, DragPreviewImage } from 'react-dnd'
import Cell from './Cell'
import { uuid } from "@magic-sdk/provider"

export default function Inventory() {
  const Web3Api = useMoralisWeb3Api()
  // const [nfts, setNFTs] = useState([])

  const { addInventoryItem, inventoryItemPositions } = useContext(PositionContext)
  const { nfts, setNFTs, getNFTsFromWallet } = useContext(NFTContext)
  
  useEffect(() => {
    getNFTsFromWallet(Web3Api).then((res) => {
      let splitNfts = []
      for(let i = 0; i < res.result.length; i++) {
        let j = 0
        while(j < res.result[i].amount) {
          splitNfts.push({
            ...res.result[i],
            amount: 1
          })
          addInventoryItem(j, 0)
          j++
        }
      }
      setNFTs(splitNfts)
    })
  }, [Web3Api.Web3API.account])
  
  return (
    <InventoryTable className="inventory-table">
      <InventoryRow className="inventory-row">
        {nfts.map((nft, i) => {
          return <Cell nft={nft} key={uuid()} x={i} y={0}/>  
        })}
      </InventoryRow>
      <InventoryRow className="inventory-row">
          <InventoryCell className="inventory-cell"/>
          <InventoryCell className="inventory-cell"/>
          <InventoryCell className="inventory-cell"/>
          <InventoryCell className="inventory-cell"/>
          <InventoryCell className="inventory-cell"/>
          <InventoryCell className="inventory-cell"/>
          <InventoryCell className="inventory-cell"/>
          <InventoryCell className="inventory-cell"/>
      </InventoryRow>
    </InventoryTable>
  )
}
