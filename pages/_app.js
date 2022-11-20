import 'antd/dist/antd.css'
import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PositionContext, usePosition } from '../context/PositionContext'
import { NFTContext, useNFT } from '../context/NFTContext'
import { TradeContext, useTrade } from '../context/TradeContext'
import { OrderContext, useOrders } from '../context/OrderContext'
import { UserPositionContext, useUserPosition } from '../context/UserPositionContext'
import { configureChains, defaultChains, WagmiConfig, createClient } from "wagmi";


import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const infuraId = process.env.INFURA_API_KEY

const { chains, provider } = configureChains(defaultChains, [
  infuraProvider({ infuraId }),
  publicProvider(),
])

// Set up connectors
export const connectors = [
  new MetaMaskConnector({
    chains,
  }),
  new WalletConnectConnector({
    chains,
    options: {
      infuraId,
      qrcode: true,
    },
  }),
]

const client = createClient({
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    // <MoralisProvider
    //   appId="IeJkMdrfKDhEFUgeVI2Gkwa7FMle5YQQ4e0wG5eC"
    //   serverUrl="https://rixvtkrckpme.usemoralis.com:2053/server"
    // >
    <WagmiConfig client={client}>
      <DndProvider backend={HTML5Backend}>
        <UserPositionContext.Provider value={useUserPosition()}>
          <PositionContext.Provider value={usePosition()}>
            <NFTContext.Provider value={useNFT()}>
              <TradeContext.Provider value={useTrade()}>
                <OrderContext.Provider value={useOrders()}>
                  <Component {...pageProps} />
                </OrderContext.Provider>
              </TradeContext.Provider>
            </NFTContext.Provider>
          </PositionContext.Provider>
        </UserPositionContext.Provider>
      </DndProvider>
    </WagmiConfig>
  // </MoralisProvider>
  )
}

export default MyApp
