import express from "express"
import cors from "cors"
import crypto from "crypto"

import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { autoCancelOrders, webhookCashFreePayment } from "./controllers/orderController.js";
import wishlistRouter from "./routes/wishlistRoute.js";
import recommendationRouter from "./routes/recommendedRouter.js";

// App Config
const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();
autoCancelOrders();


app.post(
  "/api/order/payment/webhook",
  express.raw({ type: "*/*" }),
  webhookCashFreePayment
);
// Middleware

app.use(express.json())
app.use(cors())




// api endpoints

app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/wishlist", wishlistRouter) 
app.use("/api/recommendations", recommendationRouter)
// app.get("/payment-success", (req, res) => {
//   const orderId = req.query.order_id;

//   res.redirect(
//     `http://localhost:5173/payment-success?order_id=${orderId}`
//   );
// });
// app.use(
//   '/api/order/payment/webhook',
//   express.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf;
//     }
//   })
// );


app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port, ()=> console.log("Server started on PORT : "+ port))