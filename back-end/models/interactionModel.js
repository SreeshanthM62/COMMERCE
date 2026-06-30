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

    interaction:{
        click:{
            type:Number,
            default:0
        },

        view:{
            type:Number,
            default:0
        },

        wishlist:{
            type:Number,
            default:0
        },

        cart:{
            type:Number,
            default:0
        },

        purchase:{
            type:Number,
            default:0
        }
    },

    score:{
        type:Number,
        default:0
    },

    persona:{
        type:String
    }

},
{
    timestamps:true
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