import express from "express"
import {addProduct,listProducts,removeProduct,singleProduct,categoryProducts, relatedProducts} from "../controllers/productController.js"
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { searchProducts } from "../controllers/searchController.js";

const productRouter = express.Router();

productRouter.post("/add",adminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
productRouter.post("/remove",adminAuth,removeProduct)
productRouter.post("/single",singleProduct)
productRouter.get("/list",listProducts)
productRouter.get("/related-products/:product_id", relatedProducts)

productRouter.get("/category/:category",categoryProducts)
productRouter.post("/search",searchProducts)



export default productRouter

