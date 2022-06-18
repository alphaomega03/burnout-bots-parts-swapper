import axios from "axios"
import { API_SERVER_BASE_URL } from "../../../consts"


export default async function handler(req, res) {
  const { address } = req.query

  const takerOrdersRes = await axios.get(
    `${API_SERVER_BASE_URL}/takerOrders/${address}`
  )

  res.send(takerOrdersRes.data)
}