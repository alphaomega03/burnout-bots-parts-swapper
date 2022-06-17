import { useMoralis, useChain, useWeb3ExecuteFunction } from "react-moralis"
import { Space, Typography, notification } from 'antd'
import { StyledButton } from '../lib/src/components/Account/ui'
import { NftSwap, NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { parseEther } from 'ethers/lib/utils'
import { ALLOWED_CHAIN_IDS, CONTRACT_ADDRESS, ETHER_SCAN_TX_URL_PREFIX } from '../consts'
import { SIGNED_ORDER } from './mock'
import { contractAbi } from './abi'

const { Text, Link } = Typography



export default function Swap() {
  const { account, enableWeb3 } = useMoralis()
  const { switchNetwork, chainId } = useChain()
  const isOnMainnet = ALLOWED_CHAIN_IDS.includes(chainId)

  const doSwap = async () => {
    const PART_2 = {
      tokenAddress: CONTRACT_ADDRESS, // CryptoPunk contract address
      tokenId: '2', // Token Id of the CryptoPunk we want to swap
      type: 'ERC1155', // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
    };
    
    const PART_0 = {
      tokenAddress: CONTRACT_ADDRESS, // BAYC contract address
      tokenId: '0', // Token Id of the BoredApe we want to swap
      type: 'ERC1155',
    };
    console.log('account', account)
    
    // User A Trade Data
    const walletAddressUserA = account;
    const assetsToSwapUserA = [PART_2];
    
    // User B Trade Data
    const walletAddressUserB = '0xe3Ff8021950a9BA4f2B6920F850bEd4079E19Adb';
    const assetsToSwapUserB = [PART_0];
        
    const chainId = 4
    const moralis = await enableWeb3()
    const signer = moralis.getSigner()
    console.log('signer', signer)
    
    const nftSwapSdk = new NftSwap(signer.provider, signer, chainId);
    const nftSwapSdkv4 = new NftSwapV4(signer.provider, signer, chainId);

    
    const approvalStatusForUserA = await nftSwapSdk.loadApprovalStatus(
      assetsToSwapUserA[0],
      walletAddressUserA
    )
    console.log('approvalStatusForUserA', approvalStatusForUserA)

    // If we do need to approve User A's CryptoPunk for swapping, let's do that now
    if (!approvalStatusForUserA.contractApproved) {
      const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
        assetsToSwapUserA[0],
        walletAddressUserA
      );
      const approvalTxReceipt = await approvalTx.wait();
      console.log(
        `Approved ${assetsToSwapUserA[0].tokenAddress} contract to swap with 0x (txHash: ${approvalTxReceipt.transactionHash})`
      );
    }

    // The final step is the taker (User B) submitting the order.
    // The taker approves the trade transaction and it will be submitted on the blockchain for settlement.
    // Once the transaction is confirmed, the trade will be settled and cannot be reversed.
    const fillTx = await nftSwapSdk.fillSignedOrder(
      SIGNED_ORDER,
      undefined,
      {
              // gasPrice,
            gasLimit: '500000',
            // HACK(johnnrjj) - Rinkeby still has protocol fees, so we give it a little bit of ETH so its happy.
            value: parseEther('0.01'),
      }
    );
    const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx);
    console.log(`🎉 🥳 Order filled. TxHash: ${fillTx.hash}`);

    // const order = nftSwapSdk.buildOrder(
    //   assetsToSwapUserA,
    //   assetsToSwapUserB, 
    //   walletAddressUserA, 
    //   {
    //     takerAddress: walletAddressUserB
    //   }
    // )
    // console.log('order', order)

    // const signedOrder = await nftSwapSdk.signOrder(order, account);
    // console.log('signedOrder', signedOrder)
    initializeApp()
    const db = getFirestore()
    console.log('db', db)
  }

  return (
    <div>
      <Space direction='vertical'>
        <StyledButton
          onClick={doSwap}
        >
          Swap
        </StyledButton>
        {!isOnMainnet && <Text style={styles.warning} onClick={() => switchNetwork('0x1')}>Wrong network.  Click here to use Ethereum</Text>}
      </Space>
    </div>
  )
}