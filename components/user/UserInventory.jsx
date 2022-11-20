import { useEffect, useState, useContext } from "react"
import { UserPositionContext } from "../../context/UserPositionContext"
import { NFTContext } from "../../context/NFTContext"
import UserCell from "./UserCell"
import { uuid } from "@magic-sdk/provider"
import { useAccount } from "wagmi"



export default function UserInventory() {
  
  const { addInventoryItem, inventoryItemPositions } = useContext(UserPositionContext)
  const { nfts, setNFTs, getNFTsFromWallet } = useContext(NFTContext)
  const { address } = useAccount()

  useEffect(() => {
    if(address) {
      console.log('address', address)
      getNFTsFromWallet(address).then((res) => {
        let splitNfts = []
  
        let k = 0
  
        console.log('alchemy response', res)
  
        for(let i = 0; i < res.ownedNfts.length; i++) {
          let j = 0
          while(j < res.ownedNfts[i].balance) {
            splitNfts.push({
              token_id: res.ownedNfts[i].tokenId,
              token_uri: res.ownedNfts[i]?.tokenUri.gateway,
              ...res.ownedNfts[i],
              amount: 1,
            })
            addInventoryItem(k, 0)
            j++
            k++
          }
        }
        setNFTs(splitNfts)
      })
    }
  }, [address])

  const renderCells = () => {
    const cells = []
    for(let i = 0; i < 4; i++) {
      cells.push(
        <div className={`user-cell-${i+1}`}>
          <UserCell
            nft={nfts[i]}
            key={uuid()}
            x={i}
            y={0}
          />
        </div>
      )
    }
    return cells
  }

  console.log('nfts', nfts)


  return (
    <div className="user-trade-items">
      {renderCells()}
    </div>
  )
}