import styles from '../../styles/Orders.module.css'

import MakerOrders from "./MakerOrders";
import TakerOrders from "./TakerOrders";
export default function Orders() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <MakerOrders />
        <TakerOrders />        
      </div>
    </div>
  )
}