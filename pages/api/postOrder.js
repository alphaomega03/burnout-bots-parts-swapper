// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"
import { API_SERVER_BASE_URL } from "../../consts"
export default async function handler(req, res) {
  
  await axios.post(
    `${API_SERVER_BASE_URL}/submitOrder`,
    req.body
  )

  res.status(200).json({ name: 'Done' })
}
