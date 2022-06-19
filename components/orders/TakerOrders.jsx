import { Button, Table, Tag, Typography} from "antd"
import { useContext, useEffect } from "react"
import { useMoralis } from "react-moralis"
import {
  CloseCircleOutlined
} from '@ant-design/icons'
import { OrderContext } from '../../context/OrderContext'
import moment from 'moment'
import { ORDER_STATUS_V3_TO_DISPLAY_NAME, CONTRACT_ADDRESS } from "../../consts"
import { RPGButton, RPGTable } from "./ui"
const { Text } = Typography




export default function TakerOrders() {
  const { makerOrders, takerOrders, setTakerOrders, getTakerOrders, setMakerOrders, getOrderStatus, fillOrder } = useContext(OrderContext)
  const { account, enableWeb3 } = useMoralis()

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
          <RPGButton className="rpgui-button"
            onClick={async () => {
              const moralis = await enableWeb3()
              const signer = moralis.getSigner()
              fillOrder(
                signer,
                record.orderData,
                account,
                {
                  tokenAddress: CONTRACT_ADDRESS,
                  tokenId: record.askTokenId,
                  type: 'ERC1155'
                }
              )
            }}
          >
            Fill Order
          </RPGButton>
        )
      }
    }
  ]

  useEffect(() => {
    getTakerOrders('0xD7e4f60B01Bd776308955568CEF9D0342B747875')
      .then((res) => {
        const takerData = res.data

        setTakerOrders(takerData)
      })
  }, [])


  return (
    <>
      <Text>Taker Orders</Text>

      <RPGTable
        columns={columns}
        dataSource={takerOrders}
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  )
}