import "dotenv/config";
import mongoose from "mongoose";
import productModel from "../models/productModel.js";
import { createProductEmbedding } from "../controllers/aiController.js";


const updateEmbedding = async()=>{
    try {
        
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully")

        const products = await productModel.find()

        for (const product of products){
            const embedding = await createProductEmbedding(product.searchText)

            await productModel.findByIdAndUpdate(product._id, {
                embedding
            })
            console.log("Created Embeddings for ", product.name)
        }

        console.log("Migration Completed")

        await mongoose.connection.close();
    } catch (error) {
        console.log(error)
    }
}

updateEmbedding()
