/* eslint-disable @next/next/no-img-element */
import { Button, Table, Tag, Typography, Space } from "antd"
import { useContext, useEffect } from "react"
import { useMoralis } from "react-moralis"
import {
  CloseCircleOutlined
} from '@ant-design/icons'
import { OrderContext } from '../../context/OrderContext'
import moment from 'moment'
import { ORDER_STATUS_V3_TO_DISPLAY_NAME, CONTRACT_ADDRESS, ORDER_STATUS_V3_TO_COLOR, OPEN } from "../../consts"
import { RPGButton, RPGTable, RPGText } from "./ui"
import { InventoryCell } from "../inventory/ui"
const { Text } = Typography
import { getEllipsisTxt } from "../../lib/src/helpers/formatters"
import { useAccount, useSigner } from "wagmi"

export default function TakerOrders() {
  const { makerOrders, takerOrders, setTakerOrders, getTakerOrders, setMakerOrders, getOrderStatus, fillOrder } = useContext(OrderContext)
  const { data: signer } = useSigner()
  const { address: account } = useAccount()

  const columns = [
    {
      title: 'From Address',
      key: 'address',
      // dataIndex: 'id'
      render: (_, record) => {
        return (
          <Text style={{color: 'white'}}>{getEllipsisTxt(record.orderData.makerAddress, 6)}</Text>
        )
      }
    },
    {
      title: 'You Get',
      // dataIndex: 'askTokenId',
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
              src={`${record.askTokenId}.png`}
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
      // dataIndex: 'orderStatus',
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
          isOrderOpen && <RPGButton className="rpgui-button"
            onClick={() => {
              // const moralis = await enableWeb3()
              // const signer = moralis.getSigner()
              fillOrder(
                signer,
                record,
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
    getTakerOrders(account)
      .then((res) => {
        const takerData = res.data

        setTakerOrders(takerData)
      })
  }, [])


  return (
    <>
      <Space direction="vertical">
        <RPGText>Orders for You</RPGText>

        <RPGTable
          columns={columns}
          dataSource={takerOrders}
          pagination={{ hideOnSinglePage: true }}
        />
      </Space>
    </>
  )
}