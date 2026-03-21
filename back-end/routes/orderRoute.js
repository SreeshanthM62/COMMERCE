import express from "express"

import { placeOrderStripe,allOrders,userOrders, updateStatus, placeOrderCashFreePayment, placeOrderCOD, verifyCashFreePayment, webhookCashFreePayment, retryCashFreePayment} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"


const orderRouter = express.Router()

// Admin Features
orderRouter.post("/list", adminAuth, allOrders)
orderRouter.post("/status", adminAuth, updateStatus)

// payment features
orderRouter.post("/place",authUser,placeOrderCOD)
orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post("/cashfreepayment",authUser,placeOrderCashFreePayment)
orderRouter.post("/retrycashfreepayment",authUser,retryCashFreePayment)
// orderRouter.post("/retry-payment", authUser, retryPayment)

//User Feauture
orderRouter.post("/userorders",authUser,userOrders)

//verify Payment
orderRouter.post("/verifycashfreepayment",authUser, verifyCashFreePayment)
orderRouter.post("/payment/webhook", express.raw({ type: "*/*" }),webhookCashFreePayment)


export default orderRouter