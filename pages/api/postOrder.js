// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"
import { API_SERVER_BASE_URL } from "../../consts"
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
import admin from 'firebase-admin'

require('firebase/firestore')

export default async function handler(req, res) {

  const order = req.body || {}

  if(!admin.apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
      })
    })
  }
  const db = getFirestore()

  const docRef = db.collection('orders').doc(order.orderData.signature)
  docRef.create(order)

  res.status(200).json({ message: `Order submitted for order hash ${order['signature']} with maker address ${order['makerAddress']} and taker address ${order['takerAddress']}`})
}
