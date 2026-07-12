import productModel from "../models/productModel.js";
import { create_embeddings } from "./aiController.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";

export const searchProducts = async (req, res) => {
    try {

        const { query } = req.body;

        const query_embedding = await create_embeddings(query)
        console.log(query_embedding)
        const products = await productModel.find()

        const results = []

        for (const product of products) {

            const semanticScore = cosineSimilarity(query_embedding, product.embedding)

            const keywordScore = product.searchText.toLowerCase().includes(query.toLowerCase()) ? 1 : 0

            const finalScore = semanticScore * 0.8 + keywordScore * 0.2

            results.push({ product, score: finalScore })

        }

        results.sort((a, b) => b.score - a.score)

        res.json({
            success: true,
            products: results.slice(0, 15)
        })

    } catch (error) {

        res.json({
            success:false,
            message:error.message
        })

    }

}