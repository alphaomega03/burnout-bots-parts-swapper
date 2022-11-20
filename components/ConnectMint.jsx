import { useContext } from 'react'
import { useMoralis } from 'react-moralis'
import Account from '../lib/src/components/Account/Account'
import { TradeContext } from '../context/TradeContext'
import { useAccount } from 'wagmi'

import Trade from './Trade'
import Connect from './Connect'

export default function ConnectMint() {
  const { isConnected } = useAccount()
  if(isConnected) {
    return (
      <Trade />
    )
  } else {
    return (
      <Connect />
    )
  }
}