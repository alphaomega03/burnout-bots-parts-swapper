import { Table, Tag, Typography} from "antd"
import { useContext, useEffect } from "react"
import { useMoralis } from "react-moralis"
import {
  CloseCircleOutlined
} from '@ant-design/icons'
import { OrderContext } from '../../context/OrderContext'
import moment from 'moment'
import { ORDER_STATUS_V3_TO_DISPLAY_NAME } from "../../consts"
import { RPGTable } from "./ui"
const { Text } = Typography


const columns = [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id'
  },
  {
    title: 'Maker Token Id',
    dataIndex: 'bidTokenId',
    key: 'bidTokenId' 
  },
  {
    title: 'Taker Token Id',
    dataIndex: 'askTokenId',
    key: 'askTokenId' 
  },

  {
    title: 'Status',
    // dataIndex: 'orderStatus',
    key: 'orderStatus',
    render: (_, record) => {
      return (
        <Tag color="green">
          {ORDER_STATUS_V3_TO_DISPLAY_NAME[record.orderStatus]}
        </Tag>
      )
    }
  },
  {
    title: 'Action',
    // dataIndex: 'action',
    key: 'action',
    render: (_, record) => {
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Cancel
        </Tag>
      )
    }
  }
]

export default function MakerOrders() {
  const { makerOrders, getMakerOrders, setMakerOrders, getOrderStatus } = useContext(OrderContext)
  const { account, enableWeb3 } = useMoralis()

  useEffect(() => {
    getMakerOrders(account)
      .then((res) => {
        const makerData = res.data

        setMakerOrders(makerData)
      })
  }, [])


  return (
    <>
      <Text>Your Orders</Text>

      <RPGTable
        columns={columns}
        dataSource={makerOrders}
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  )
}