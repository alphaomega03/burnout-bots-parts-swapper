import { createContext, useState } from "react"
import { getMakerOrdersForAddress, getTakerOrdersForAddress } from "../requests"
import { NftSwap } from '@traderxyz/nft-swap-sdk'
import { CHAIN_ID } from "../consts"
import { parseEther } from 'ethers/lib/utils'



export const useOrders = () => {
  const [makerOrders, setMakerOrders] = useState([])
  const [takerOrders, setTakerOrders] = useState([])

  const getMakerOrders = async (address) => {
     return getMakerOrdersForAddress(address)
  }

  const getTakerOrders = (address) => {
    return getTakerOrdersForAddress(address)
  }

  const fillOrder = async (signer, order, walletAddress, asset) => {
    const nftSwapSdk = new NftSwap(signer.provider, signer, CHAIN_ID)
    
    const approvalStatus = await nftSwapSdk.loadApprovalStatus(
      asset,
      walletAddress
    )

    // If we do need to approve User A's CryptoPunk for swapping, let's do that now
    if (!approvalStatus.contractApproved) {
      const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
        assetsToSwapUserA[0],
        walletAddressUserA
      );
      const approvalTxReceipt = await approvalTx.wait();
      console.log(
        `Approved ${assetsToSwapUserA[0].tokenAddress} contract to swap with 0x (txHash: ${approvalTxReceipt.transactionHash})`
      );
    }

    console.log('order', order)

    const fillTx = await nftSwapSdk.fillSignedOrder(
      order,
      undefined,
      {
              // gasPrice,
            gasLimit: '500000',
            // HACK(johnnrjj) - Rinkeby still has protocol fees, so we give it a little bit of ETH so its happy.
            value: parseEther('0.01'),
      }
    )
    const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx);
    console.log(`🎉 🥳 Order filled. TxHash: ${fillTx.hash}`);
  }

  const getOrderStatus = async (signer, order) => {
    const nftSwapSdk = new NftSwap(signer.provider, signer, CHAIN_ID)
    const orderStatus = await nftSwapSdk.getOrderStatus(order)
  } 

  return {
    makerOrders,
    takerOrders,
    setMakerOrders,
    setTakerOrders,
    getMakerOrders,
    getTakerOrders,
    getOrderStatus,
    fillOrder
  }
}

export const OrderContext = createContext()
