import 'antd/dist/antd.css'
import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PositionContext, usePosition } from '../context/PositionContext'
import { NFTContext, useNFT } from '../context/NFTContext'
import { TradeContext, useTrade } from '../context/TradeContext'
import { OrderContext, useOrders } from '../context/OrderContext'
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="IeJkMdrfKDhEFUgeVI2Gkwa7FMle5YQQ4e0wG5eC"
      serverUrl="https://rixvtkrckpme.usemoralis.com:2053/server"
    >
    <DndProvider backend={HTML5Backend}>
      <PositionContext.Provider value={usePosition()}>
        <NFTContext.Provider value={useNFT()}>
          <TradeContext.Provider value={useTrade()}>
            <OrderContext.Provider value={useOrders()}>
              <Component {...pageProps} />
            </OrderContext.Provider>
          </TradeContext.Provider>
        </NFTContext.Provider>
      </PositionContext.Provider>
    </DndProvider>
  </MoralisProvider>
  )
}

export default MyApp
