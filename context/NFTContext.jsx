import { createContext, useState } from "react"
import { CONTRACT_ADDRESS, NETWORK } from "../consts"
import { Alchemy, Network } from "alchemy-sdk"

export const useNFT = () => {
  const [nfts, setNFTs] = useState([])

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET
  }

  const alchemy = new Alchemy(settings)
  
  const getNFTsFromWallet = async (address) => {
    return alchemy.nft.getNftsForOwner(
      address,
      { contractAddresses: [CONTRACT_ADDRESS] }
    )
  }

  const doesUserOwnTokenId = (tokenId) => {
    return nfts.find((nft) => nft.token_id === tokenId) !== undefined
  }

  return {
    nfts,
    getNFTsFromWallet,
    setNFTs,
    doesUserOwnTokenId
  }
}

export const NFTContext = createContext()