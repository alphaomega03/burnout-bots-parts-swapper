import { createContext, useState } from "react"
import { useMoralisWeb3Api } from "react-moralis"
import { CONTRACT_ADDRESS } from "../consts"

export const useNFT = () => {
  const [nfts, setNFTs] = useState([])

  const getNFTsFromWallet = (web3Api) => {
    return web3Api.Web3API.account.getNFTsForContract({
      chain: "rinkeby",
      token_address: CONTRACT_ADDRESS
    })
  }

  const doesUserOwnTokenId = (tokenId) => {
    return nfts.find((nft) => nft.token_id === tokenId) === undefined
  }

  return {
    nfts,
    getNFTsFromWallet,
    setNFTs,
    doesUserOwnTokenId
  }
}

export const NFTContext = createContext()