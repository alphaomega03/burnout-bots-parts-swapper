import axios from "axios"
import { API_SERVER_BASE_URL } from "../consts"
export const postOrder = (signedOrder) => {
  return axios.post(
    `${API_SERVER_BASE_URL}/submitOrder`,
    signedOrder
  )
}