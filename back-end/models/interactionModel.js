import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },

    score:{
        type:Number,
        default:0
    },
    lastUpdated: { type: Date, default: Date.now }

})

interactionSchema.index(
{
    userId:1,
    productId:1
},
{
    unique:true
})

const interactionModel =
mongoose.models.interaction ||
mongoose.model("interaction",interactionSchema);

export default interactionModel;