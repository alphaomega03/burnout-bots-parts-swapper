import { createContext, useState } from "react"
import { CONTRACT_ADDRESS, CHAIN_ID } from "../consts"
import { NftSwap } from '@traderxyz/nft-swap-sdk'
import { postOrder } from '../requests/'

export const useTrade = () => {
  const [askTokenId, setAskTokenId] = useState(undefined)
  const [bidTokenId, setBidTokenId] = useState(undefined)
  const [recipientAddress, setRecipientAddress] = useState('')


  const isOrderReadyToSubmit = () => {
    return askTokenId && bidTokenId && recipientAddress.length !== 0
  }

  const submitOrder = async (ownerAddress, signer) => {
    console.log('order submit', ownerAddress)
    console.log('signer', signer)
    const BID_PART = {
      tokenAddress: CONTRACT_ADDRESS,
      tokenId: bidTokenId,
      type: 'ERC1155'
    }

    const ASK_PART = {
      tokenAddress: CONTRACT_ADDRESS,
      tokenId: askTokenId,
      type: 'ERC1155'
    }

    const nftSwapSdk = new NftSwap(signer.provider, signer, CHAIN_ID)

    const approvalStatus = await nftSwapSdk.loadApprovalStatus(
      BID_PART,
      ownerAddress
    )

    if(!approvalStatus.contractApproved) {
      const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
        BID_PART,
        ownerAddress
      )

      const approvalTxReceipt = await approvalTx.wait()
      console.log(
        `Approved ${BID_PART.tokenAddress} contract to swap with 0x (txHash: ${approvalTxReceipt.transactionHash})`
      )
    }

    const order = nftSwapSdk.buildOrder(
      [BID_PART],
      [ASK_PART],
      ownerAddress,
      {
        takerAddress: recipientAddress
      }
    )

    console.log('order', order)
    
    const signedOrder = await nftSwapSdk.signOrder(order, ownerAddress)

    console.log('signedOrder', signedOrder)

    postOrder(signedOrder).then((res) => {
      console.log('res', res)
    })
    // const
  }

  return {
    askTokenId,
    bidTokenId,
    recipientAddress,
    setAskTokenId,
    setBidTokenId,
    setRecipientAddress,
    isOrderReadyToSubmit,
    submitOrder
  }
}

export const TradeContext = createContext()