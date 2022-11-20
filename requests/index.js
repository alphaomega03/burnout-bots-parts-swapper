import axios from "axios"
import { API_SERVER_BASE_URL } from "../consts"
export const postOrder = (body) => {
  return axios.post(
    `/api/postOrder`,
    body
  )
}

export const updateOrder = (body) => {
  return axios.post(
    `/api/updateOrder`,
    body
  )
}

export const getMakerOrdersForAddress = (address) => {
  return axios.get(
    `/api/makerOrders/${address}`
  )
}

export const getTakerOrdersForAddress = (address) => {
  return axios.get(
    `/api/takerOrders/${address}`
  )
}