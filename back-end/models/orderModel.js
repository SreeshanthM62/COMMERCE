import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    note: {type:String, default:""},
    status: {
        type: String,
        enum: ['PENDING', 'PAID', 'CANCELLED', 'COMPLETED'],
        default: 'PENDING'
    },
    orderUpdate: {
        type: String,
        enum: ['ORDER PLACED', 'PACKING', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED', 'CANCELLED'],
        default: 'ORDER PLACED'
    },
    orderId: {
        type: String,
        default: null
    },
    paymentId: {
        type: String,
        default: null
    },
    paymentTime: {
        type: Date,
        default: null
    },
    paymentMessage: {
        type: String,
        default: null
    },
    // cashfreeOrderId:{
    //     type: String,
    //     default: null
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true }
}, {timestamps:true})


const orderModel = mongoose.order || mongoose.model("order", orderSchema)
export default orderModel;