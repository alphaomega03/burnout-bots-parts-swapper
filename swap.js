const { NftSwap } = require('@traderxyz/nft-swap-sdk');
const ethers = require('ethers')

const PART_2 = {
  tokenAddress: '0x0342Af0acca4271De4659a4e4D12E0AEcE218131', // CryptoPunk contract address
  tokenId: '2', // Token Id of the CryptoPunk we want to swap
  type: 'ERC1155', // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
};

const PART_0 = {
  tokenAddress: '0x0342Af0acca4271De4659a4e4D12E0AEcE218131', // BAYC contract address
  tokenId: '0', // Token Id of the BoredApe we want to swap
  type: 'ERC1155',
};

// User A Trade Data
const walletAddressUserA = '0xD7e4f60B01Bd776308955568CEF9D0342B747875';
const assetsToSwapUserA = [PART_2];

// User B Trade Data
const walletAddressUserB = '0xe3Ff8021950a9BA4f2B6920F850bEd4079E19Adb';
const assetsToSwapUserB = [PART_0];

const provider = new ethers.providers.JsonRpcProvider('https://patient-patient-pine.quiknode.io/220ef152-2d1d-4aef-83fa-deeb4d7c0081/FF6-SctH2Z3S2OaaMHS8HuOCE_m5lgktw0pLyE8bKkrr7uc7R2xTgwMhGwlt4XA-q_GjVUZ9KNqqqhj7bsIxkQ==/')

const signer = provider.getSigner();

const chainId = 4

const nftSwapSdk = new NftSwap(provider, signer, chainId);
