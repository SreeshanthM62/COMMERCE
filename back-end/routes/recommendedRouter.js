import express from "express"
import { getRecommendations, trackEvent } from "../controllers/recommendationController.js"
import authUser from "../middleware/auth.js"




const recommendationRouter = express.Router()

recommendationRouter.post("/track-event", authUser, trackEvent)
recommendationRouter.get("/get-recommendation/:productId", getRecommendations)

export default recommendationRouter