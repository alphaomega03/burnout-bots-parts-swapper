import { createContext, useState } from "react"
import { getMakerOrdersForAddress, getTakerOrdersForAddress, updateOrder } from "../requests"
import { NftSwap } from '@traderxyz/nft-swap-sdk'
import { CANCELED_DISPLAY_NAME, CHAIN_ID, DISPLAY_NAME_ORDER_STATUS_V3, DISPLAY_NAME_TO_ORDER_STATUS_V3, FILLED_DISPLAY_NAME, GOERLI_ZEROEX_ADDRESSES, ORDER_STATUS_V3_TO_DISPLAY_NAME } from "../consts"
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

  const refreshMakerOrders = (account) => {
    getMakerOrders(account)
      .then((res) => {
        const makerData = res.data

        setMakerOrders(makerData)
      })
  }

  const refreshTakerOrders = (account) => {
    getTakerOrders(account)
      .then((res) => {
        const takerData = res.data
        setTakerOrders(takerData)
      })
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
        asset,
        walletAddress
      );
      const approvalTxReceipt = await approvalTx.wait();
      console.log(
        `Approved ${asset.tokenAddress} contract to swap with 0x (txHash: ${approvalTxReceipt.transactionHash})`
      );
    }

    nftSwapSdk.fillSignedOrder(
      order.orderData,
      undefined,
      {
              // gasPrice,
            gasLimit: '500000',
            // // HACK(johnnrjj) - Rinkeby still has protocol fees, so we give it a little bit of ETH so its happy.
            // value: parseEther('0.01'),
      }
    ).then((res) => {
      updateOrder({
        ...order,
        orderStatus: DISPLAY_NAME_TO_ORDER_STATUS_V3[FILLED_DISPLAY_NAME]
      }).then((res2) => {
        refreshTakerOrders(walletAddress)
      })
    })
  }

  const cancelOrder = async (signer, order, account) => {
    const nftSwapSdk = new NftSwap(signer.provider, signer, CHAIN_ID)
    return nftSwapSdk.cancelOrder(order.orderData)
      .then((res) => {
        updateOrder({
          ...order,
          orderStatus: DISPLAY_NAME_TO_ORDER_STATUS_V3[CANCELED_DISPLAY_NAME]
        }).then((res2) => {
          refreshMakerOrders(account)
        })
      })
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
    fillOrder,
    refreshMakerOrders,
    refreshTakerOrders,
    cancelOrder
  }
}

export const OrderContext = createContext()
