import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type: String, required:true},
    description:{type: String, required:true},
    price:{type: Number, required:true},
    image:{type: Array, required:true},
    category:{type: String, required:true},
    subCategory:{type: [String], required:true},
    color:{type: String, required:true},
    bestSeller:{type: Boolean},
    date:{type:Number,required:true},
    relatedProducts : {type:[String], default:null},
    tags: [String],
    occasions: [String],
    style: [String],
    search_keywords: [String],
    searchText: String,
    embedding: [Number]
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel