
import { Network, Alchemy } from 'alchemy-sdk'

export const CONTRACT_ADDRESS = '0x5DE8a0E46fFDaf44049263F99Ea2a16EE93d8105'
export const IPFS_IMAGE_BASE_URI = 'https://gateway.pinata.cloud/ipfs/QmSjvSpwMZTiiQ4oDCwnQdsHFB1ZcBcdwPC9Q8212YdjKd'
export const ALLOWED_CHAIN_IDS = ['0x1', '0x4', '0x5']
export const ETHER_SCAN_TX_URL_PREFIX = 'https://etherscan.io/tx/'
export const CHAIN_ID = 1 
// export const API_SERVER_BASE_URL = 'https://endpoints-prod-rhy5sb5oqa-uc.a.run.app'
export const ORDER_STATUS_V3_TO_DISPLAY_NAME = {
  '0': 'Invalid',
  '1': 'Invalid Maker Asset Amount',
  '2': 'Invalid Taker Asset Amount',
  '3': 'Open',
  '4': 'Expired',
  '5': 'Filled',
  '6': 'Canceled'
}

export const DISPLAY_NAME_TO_ORDER_STATUS_V3 = {
  'Invalid': '0',
  'Invalid Maker Asset Amount': '1',
  'Invalid Taker Asset Amount': '2',
  'Open': '3',
  'Expired': '4',
  'Filled': '5',
  'Canceled': '6' 
}

export const ORDER_STATUS_V3_TO_COLOR = {
  '0': 'red',
  '1': 'red',
  '2': 'red',
  '3': 'green',
  '4': 'warning',
  '5': 'success',
  '6': 'red'
}

export const GOERLI_ZEROEX_ADDRESSES = {
  "exchange": "0xf91bb752490473b8342a3e964e855b9f9a2a668e",
  "wrappedNativeToken": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
}

export const NETWORK = Network.ETH_MAINNET

export const CANCELED_DISPLAY_NAME = 'Canceled'
export const FILLED_DISPLAY_NAME = 'Filled'
export const OPEN = 'Open'

export const API_SERVER_BASE_URL = 'http://localhost:8080'
