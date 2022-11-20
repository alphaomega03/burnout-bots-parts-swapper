/* eslint-disable @next/next/no-img-element */
import { Button, Space, Table, Tag, Typography} from "antd"
import { useContext, useEffect } from "react"
import { useMoralis } from "react-moralis"
import {
  CloseCircleOutlined
} from '@ant-design/icons'
import { OrderContext } from '../../context/OrderContext'
import moment from 'moment'
import { OPEN, ORDER_STATUS_V3_TO_COLOR, ORDER_STATUS_V3_TO_DISPLAY_NAME } from "../../consts"
import { RPGTable, RPGText } from "./ui"
import { InventoryCell } from "../inventory/ui"
const { Text } = Typography
import { getEllipsisTxt } from "../../lib/src/helpers/formatters"
import { useAccount, useSigner } from "wagmi"





export default function MakerOrders() {

  
  const { makerOrders, getMakerOrders, setMakerOrders, refreshMakerOrders, cancelOrder } = useContext(OrderContext)
  const { address: account } = useAccount()
  const { data: signer } = useSigner()
  // const { account, enableWeb3 } = useMoralis()

  useEffect(() => {
    getMakerOrders(account)
      .then((res) => {
        const makerData = res.data

        setMakerOrders(makerData)
      })
  }, [])

  const columns = [
    {
      title: 'To Address',
      key: 'address',
      render: (_, record) => {
        return (
          <Text style={{color: 'white'}}>{getEllipsisTxt(record.orderData.takerAddress, 6)}</Text>
        )
      }
    },
    {
      title: 'You Get',
      render: (_, record) => {
        return (
          <InventoryCell
            className="inventory-cell"
          >
            <img
              src={`${record.askTokenId}.png`}
              alt={''}
              height="36px"
              width="36px"
            />
          </InventoryCell>
        )
      },
       key: 'askTokenId' 
    },
    {
      title: 'They Get',
      render: (_, record) => {
        return (
          <InventoryCell
            className="inventory-cell"
          >
            <img
              src={`${record.bidTokenId}.png`}
              alt={''}
              height="36px"
              width="36px"
            />
          </InventoryCell>
        )
      },
      key: 'bidTokenId' 
    },
    {
      title: 'Status',
      key: 'orderStatus',
      render: (_, record) => {
        return (
          <Tag color={ORDER_STATUS_V3_TO_COLOR[record.orderStatus]}>
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
        const isOrderOpen = ORDER_STATUS_V3_TO_DISPLAY_NAME[record.orderStatus] === OPEN
        return (
          isOrderOpen && <Button 
            icon={<CloseCircleOutlined />}
            danger
            type="primary"
            color="error"
            onClick={async() =>  {
              cancelOrder(signer, record, account)
            }}
          >
            Cancel
          </Button>
        )
      }
    }
  ]


  return (
    <>
      <Space direction="vertical">
        <RPGText>Your Orders</RPGText>
        <RPGTable
          columns={columns}
          dataSource={makerOrders}
          pagination={{ hideOnSinglePage: true }}
        />
      </Space>
    </>
  )
}