import { exists } from "fs";
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";
import { Cashfree, CFEnvironment } from "cashfree-pg"
import crypto from "crypto"
import cron from "node-cron";

// Cashfree configuration
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

const cashfree = new Cashfree(
    process.env.NODE_ENV === "production" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
    CASHFREE_APP_ID,
    CASHFREE_SECRET_KEY
)

// Helper function to generate order ID
const generateOrderId = () => {
    return 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};


const placeOrderCOD = async (req, res) => {

    try {

        const userId = req.user.id
        const { items, amount, address, note } = req.body;

        if (!items || Object.keys(items).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty. Cannot place order."
            });
        }

        const orderId = generateOrderId();

        const orderData = {
            userId,
            items,
            address,
            note,
            orderId,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }


}

// PLace Order using stripe
const placeOrderStripe = async (req, res) => {



}


// PLace Order using CashFree
const placeOrderCashFreePayment = async (req, res) => {
    try {

        const userId = req.user.id;
        const { items, amount, address, note } = req.body;

        console.log(req.user);

        if (!items || Object.keys(items).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty. Cannot place order."
            });
        }


        if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
            return res.status(500).json({
                message: "Cashfree configuration is missing. Please Check CASHFREE_APP_ID and CASHFREE_SECRET_KEY environmetn variables"
            });
        }

        const orderId = generateOrderId();

        const orderData = {
            userId,
            items,
            address,
            note,
            orderId,
            amount,
            paymentMethod: "CashFreePayment",
            payment: false,
            date: Date.now()
        };



        const orderDetails = {
            order_amount: amount,
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: userId,
                customer_phone: address.phone,
                customer_name: address.firstName + " " + address.lastName,
                customer_email: address.email
            },
            order_meta: {
                return_url: `https://twistnbloom.co.in/payment-success?order_id=${orderId}`,
                notify_url: `https://twistnbloom-backend.vercel.app/api/order/payment/webhook`,
                payment_methods: "cc,dc,upi"
            },
        };

        console.log('Creating Cashfree order with data:', orderDetails);

        const cashfreeResponse = await cashfree.PGCreateOrder(orderDetails);
        console.log('Cashfree response:', cashfreeResponse.data);

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        if (cashfreeResponse.data.payment_session_id) {
            res.json({
                success: true,
                message: 'Order Placed',
                orderId: orderId,
                paymentUrl: cashfreeResponse.data.payment_link,
                paymentSessionId: cashfreeResponse.data.payment_session_id
            });
        } else {
            throw new Error('Failed to create payment session');
        }


    } catch (error) {
        console.error("🔥 FULL BACKEND ERROR:");
        console.error(error);

        if (error.response) {
            console.error("Cashfree API Error Data:", error.response.data);
        }

        return res.status(500).json({
            message: error.message,
            details: error.response?.data || "No extra details"
        });
    }
};

const verifyCashFreePayment = async (req, res) => {

    try {

        console.log("AUTH HEADER:", req.headers.authorization);


        const userId = req.user.id;
        const { orderId } = req.body;
        console.log(userId)

        if (!orderId) {
            return res.status(400).json({ message: "Order ID is Required" })
        }



        console.log(`Verifying payment for order : ${orderId}`)

        // Get order details from Cashfree using SDK
        const cashfreeResponse = await cashfree.PGFetchOrder(orderId)
        console.log("Cashfree order details : ", cashfreeResponse)
        console.log(cashfreeResponse.data)


        const orderStatus = cashfreeResponse.data.order_status;
        const paymentDetails = cashfreeResponse.data.payment_details || {};
        console.log("Order Status: ", orderStatus)
        console.log(paymentDetails)

        const newOrder = await orderModel.findOne({ orderId })

        // Idempotency guard
        if (newOrder.payment === true) {
            return res.json({
                success: true,
                message: "Order already verified",
                order: newOrder
            });
        }

        // const userId = newOrder.userId;


        if (newOrder) {
            console.log(`Updating Order ${orderId} from status: ${newOrder.status} to: ${orderStatus}`);


            switch (orderStatus) {
                case 'PAID':
                    newOrder.status = 'PAID';
                    newOrder.payment = true;
                    await userModel.findByIdAndUpdate(userId, { cartData: {} })
                    console.log(`Payment verified as successful for order ${orderId}`);
                    break;

                case 'EXPIRED':
                    newOrder.status = 'CANCELLED';
                    console.log(`Payment expired for order ${orderId}`);
                    break;

                case 'FAILED':
                    newOrder.status = 'FAILED';
                    console.log(`Payment failed for order ${orderId}`);
                    break;

                case 'ACTIVE':
                    newOrder.status = 'PENDING';
                    break;

                case 'PENDING':
                    newOrder.status = 'PENDING';
                    console.log(`Payment still pending for order ${orderId}`);
                    break;

                default:
                    console.log("Unhandled status:", orderStatus);
                    newOrder.status = 'PENDING';



            }

            await newOrder.save();
            console.log(`Order ${orderId} updated successfully`);

            res.json({
                success: true,
                orderStatus: orderStatus,
                status: newOrder.status,
                paymentDetails: paymentDetails,
                order: {
                    id: newOrder._id,
                    address: newOrder.address,
                    firstName: newOrder.address.firstName,
                    lastName: newOrder.address.lastName,
                    phone: newOrder.address.phone,
                    email: newOrder.address.email,
                    status: newOrder.status,
                    orderId: newOrder.orderId,
                    items: newOrder.items,
                    amount: newOrder.amount,
                    paymentMethod: newOrder.paymentMethod,

                }

            })

        } else {
            console.error(`Order not found for orderId: ${orderId}`);
            res.status(404).json({
                success: false,
                message: 'Order not found',
                orderStatus: orderStatus
            });
        }



    } catch (error) {

        console.error('Payment verification error:', error);

        // Log detailed error information
        if (error.response) {
            console.error('Cashfree API Error Response:', {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to verify payment',
            error: error.message,
            details: error.response?.data || 'No additional details available'
        });

    }

}

//Webhook

const webhookCashFreePayment = async (req, res) => {

    //     console.log("Webhook hit successfully");
    //     console.log(req.body);
    //     return res.status(200).send("OK");
    // };
    try {



        // VERIFY SIGNATURE
        const signature = req.headers["x-webhook-signature"];
        const timestamp = req.headers["x-webhook-timestamp"];
        const rawBodyBuffer = req.body;

        if (!Buffer.isBuffer(rawBodyBuffer)) {
            console.log("Body is not buffer!");
            return res.status(400).send("Invalid body type");
        }

        const rawBody = rawBodyBuffer.toString("utf8");

        // console.log("FULL RAW BODY:", rawBody);
        // console.log("TIMESTAMP:", timestamp);

        // const signedPayload = timestamp + rawBody;


        // const expectedSignature = crypto
        //     .createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET.trim())
        //     .update(signedPayload)
        //     .digest("base64")

        // // console.log("SECRET USED:", process.env.CASHFREE_WEBHOOK_SECRET);

        // console.log("Received Signature:", signature);
        // console.log("Expected Signature:", expectedSignature);

        // if (signature !== expectedSignature) {
        //     console.error("Invalid webhook signature");
        //     return res.status(400).send("Invalid signature");
        // }




        // EXTRACT CORRECT FIELDS (Cashfree v2 format)
        const body = JSON.parse(rawBody);
        const { data } = body;
        const eventType = body.type;

        if (!data || !data.order || !data.payment) {
            return res.status(400).send("Invalid webhook payload");
        }

        console.log("CASHFREE DATA : ", data)

        const orderId = data.order.order_id;
        const paymentStatus = data.payment.payment_status;
        const paymentAmount = data.payment.payment_amount;
        const paymentId = data.payment.cf_payment_id;
        const paymentMessage = data.payment.payment_message;
        const paymentTime = data.payment.payment_time;

        // Validate order exists
        const newOrder = await orderModel.findOne({ orderId });

        if (!newOrder) {
            console.error("Order not found:", orderId);
            return res.status(404).send("Order not found");
        }

        if (newOrder.status == "PAID") {
            console.log("Already processed:", orderId);
            return res.status(200).json({ success: true });
        }

        // vALIDATE PAYMENT AMOUNT
        if (eventType == "PAYMENT_SUCCESS_WEBHOOK") {
            if (Number(paymentAmount) !== Number(newOrder.amount)) {
                console.error("Amount mismatch for:", orderId);
                return res.status(400).send("Amount mismatch");
            }
        }

        //PAYMENT SUCCESS
        if (eventType === "PAYMENT_SUCCESS_WEBHOOK" && paymentStatus === "SUCCESS") {
            newOrder.status = "PAID";
            newOrder.paymentId = paymentId;
            newOrder.payment = true;
            newOrder.paymentTime = new Date(paymentTime);
            newOrder.paymentMessage = paymentMessage;


            await userModel.findByIdAndUpdate(newOrder.userId, { cartData: {} })
            console.log(`Payment VERIFIED as successful for order ${orderId}`);
        }

        //PAYMENT FAILED
        else if (eventType === "PAYMENT_FAILED_WEBHOOK") {
            newOrder.status = "FAILED";
            newOrder.payment = false;

            newOrder.paymentId = paymentId || null;
            newOrder.paymentTime = new Date();
            newOrder.paymentMessage = paymentMessage || "Payment failed";
        }

        // 💰 PAYMENT CHARGES
        else if (eventType === "PAYMENT_CHARGES_WEBHOOK") {

            console.log("Charges webhook received for:", orderId);


        }

        else {
            console.log("Unhandled event type:", eventType);
        }

        await newOrder.save();

        console.log("Webhook processed successfully:", orderId);

        return res.status(200).json({
            success: true,
            orderId,
            status: newOrder.status
        });






    } catch (error) {

        console.error("Webhook error:", error);
        return res.status(500).send("Internal server error");

    }
}

const retryCashFreePayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required"
            });
        }

        // Find existing order
        const existingOrder = await orderModel.findOne({ orderId });

        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Prevent retry if already paid
        if (existingOrder.payment === true) {
            return res.status(400).json({
                success: false,
                message: "Order already paid"
            });
        }

        const newOrderId = generateOrderId();


        // Create new Cashfree order session
        const orderDetails = {
            order_amount: existingOrder.amount,
            order_currency: "INR",
            order_id: newOrderId, // SAME ORDER ID
            customer_details: {
                customer_id: userId,
                customer_phone: existingOrder.address.phone,
                customer_name: existingOrder.address.firstName + " " + existingOrder.address.lastName,
                customer_email: existingOrder.address.email
            },
            order_meta: {
                return_url: `https://twistnbloom.co.in/payment-success?order_id=${newOrderId}`,
                notify_url: `https://twistnbloom-backend.vercel.app/api/order/payment/webhook`,
                payment_methods: "cc,dc,upi"
            },
        };

        console.log("Retrying payment with:", orderDetails);

        const cashfreeResponse = await cashfree.PGCreateOrder(orderDetails);

        existingOrder.orderId = newOrderId;
        existingOrder.status = "PENDING";
        await existingOrder.save();


        if (cashfreeResponse.data.payment_session_id) {
            return res.json({
                success: true,
                message: "Retry payment initiated",
                paymentSessionId: cashfreeResponse.data.payment_session_id,
                paymentUrl: cashfreeResponse.data.payment_link
            });
        } else {
            throw new Error("Failed to create retry payment session");
        }

    } catch (error) {
        console.error("Retry Payment Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const autoCancelOrders = () => {

    // Runs every 5 minutes
    cron.schedule("*/5 * * * *", async () => {
        try {

            console.log("Running auto-cancel job...");

            const expiryMinutes = 30;
            const expiryTime = new Date(Date.now() - expiryMinutes * 60 * 1000);


            const expiredOrders = await orderModel.find({
                status: "PENDING",
                paymentMethod: "CashFreePayment",
                payment: false,
                createdAt: { $lt: expiryTime }
            });

            if (!expiredOrders.length) {
                console.log("No expired orders found.");
                return;
            }

            for (const order of expiredOrders) {
                order.status = "CANCELLED";
                order.orderUpdate = "CANCELLED";
                await order.save();
            }

            console.log(`Auto-cancelled ${expiredOrders.length} orders`);


        } catch (error) {
            console.error("Auto cancel error:", error.message);
        }
    },

    {
        timezone: "Asia/Kolkata"
    }


);
};

// ALl orders data for admin panel

const allOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}


// User orders data for admin panel

const userOrders = async (req, res) => {
    try {
        const userId = req.user.id
        console.log("User IDD: ", userId)
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}


// Update order status from admin panel
const updateStatus = async (req, res) => {

    try {


        const { orderId, orderUpdate } = req.body
        await orderModel.findByIdAndUpdate(orderId, { $set: { orderUpdate: orderUpdate } }, { new: true })
        res.json({ success: true, message: "Status updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }


}


export { placeOrderStripe, placeOrderCashFreePayment, placeOrderCOD, allOrders, userOrders, updateStatus, verifyCashFreePayment, webhookCashFreePayment, retryCashFreePayment, autoCancelOrders }
