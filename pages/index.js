import App from './App'
import { isDesktop } from 'react-device-detect'
import Mobile from '../components/Mobile'
export default function Home() {
  if(!isDesktop) {
    return (
      <Mobile />
    )
  } else {
    return (
      <App />
    )
  } 
}
