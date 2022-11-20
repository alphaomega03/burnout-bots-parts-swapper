import { createContext, useState } from "react"
import { CONTRACT_ADDRESS, CHAIN_ID, GOERLI_ZEROEX_ADDRESSES } from "../consts"
import { NftSwap, NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { postOrder } from '../requests/'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

export const useTrade = () => {
  const [askTokenId, setAskTokenId] = useState(undefined)
  const [bidTokenId, setBidTokenId] = useState(undefined)
  const [recipientAddress, setRecipientAddress] = useState('')


  const isOrderReadyToSubmit = () => {
    return askTokenId && bidTokenId && recipientAddress.length !== 0
  }

  const isOrderEmpty = () => {

    return askTokenId === undefined && bidTokenId === undefined && recipientAddress.length === 0
  }

  const clearTrade = () => {
    setAskTokenId(undefined)
    setBidTokenId(undefined)
    setRecipientAddress('')
  }

  const submitOrder = async (ownerAddress, signer) => {
    const BID_PART = {
      tokenAddress: CONTRACT_ADDRESS,
      tokenId: bidTokenId,
      type: 'ERC1155'
    }

    console.log('BID PART', BID_PART)

    const ASK_PART = {
      tokenAddress: CONTRACT_ADDRESS,
      tokenId: askTokenId,
      type: 'ERC1155'
    }

    console.log('ASK PART', ASK_PART)

    const nftSwapSdk = new NftSwap(signer.provider, signer, CHAIN_ID)
 
    // console.log('signer.provider', signer.provider)
    // console.log('signer', signer)
    // console.log('ownerAddress', ownerAddress)


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
      ownerAddress.toLowerCase(),
      {
        takerAddress: recipientAddress.toLowerCase()
      }
    )

    const signedOrder = await nftSwapSdk.signOrder(order, ownerAddress)
    const orderStatus = await nftSwapSdk.getOrderStatus(signedOrder)

    const body = {
      id: uuidv4(),
      bidTokenId,
      askTokenId,
      orderStatus,
      expiresIn: moment().add(parseInt(signedOrder.expirationTimeSeconds), 'seconds').valueOf(),
      orderData: signedOrder
    }


    return postOrder(body)
  }

  return {
    askTokenId,
    bidTokenId,
    recipientAddress,
    setAskTokenId,
    setBidTokenId,
    setRecipientAddress,
    isOrderReadyToSubmit,
    isOrderEmpty,
    submitOrder,
    clearTrade
  }
}

export const TradeContext = createContext()