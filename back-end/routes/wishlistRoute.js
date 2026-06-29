import express from "express"
import authUser from "../middleware/auth.js";
import { getWishlist, toggleWishlist } from "../controllers/wishlistcontroller.js";


const wishlistRouter = express.Router()

wishlistRouter.post("/toggle-wishlist", authUser, toggleWishlist)
wishlistRouter.get("/get-wishlist", authUser, getWishlist)

export default wishlistRouter