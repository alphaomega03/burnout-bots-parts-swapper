const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
import admin from "firebase-admin";
require("firebase/firestore");

export default async function handler(req, res) {
  if (!admin.apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    });
  }
  const db = getFirestore();

  const { address } = req.query;

  const makerAddress = (address || "").toLowerCase();
  const orderRef = db.collection("orders");

  const orders = [];

  const snapshot = await orderRef
    .where("orderData.makerAddress", "==", makerAddress)
    .get();

  snapshot.forEach((doc) => {
    orders.push(doc.data());
  });

  res.send(orders);
}
