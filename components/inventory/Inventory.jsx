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
import UserCell from './UserCell'
import { uuid } from "@magic-sdk/provider"
import { UserPositionContext } from "../../context/UserPositionContext"

export default function Inventory() {
  const Web3Api = useMoralisWeb3Api()
  // const [nfts, setNFTs] = useState([])

  const { addInventoryItem, inventoryItemPositions } = useContext(UserPositionContext)
  const { nfts, setNFTs, getNFTsFromWallet } = useContext(NFTContext)

  useEffect(() => {
    getNFTsFromWallet(Web3Api).then((res) => {
      let splitNfts = []

      let k = 0;
      
      for(let i = 0; i < res.result.length; i++) {
        let j = 0
        while(j < res.result[i].amount) {
          splitNfts.push({
            ...res.result[i],
            amount: 1
          })
          addInventoryItem(k, 0)
          j++
          k++
        }
      }
      setNFTs(splitNfts)
    })
  }, [])

  
  
  return (
    <InventoryTable className="inventory-table">
      <InventoryRow className="inventory-row">
        {
          nfts.map((nft, i) => {
            if(i < 4) {
              return <UserCell nft={nft} key={uuid()} x={i} y={0}/>  
            }
          })
        }
      </InventoryRow>
    </InventoryTable>
  )
}
