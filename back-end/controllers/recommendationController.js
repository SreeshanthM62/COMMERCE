import interactionModel from "../models/interactionModel";

const EVENT_SCORES = {
    "click": 1,
    "view_10s": 2,
    "wishlist": 3,
    "cart": 4,
    "purchase": 5
}

const trackEvent = async (req, res) => {

    try {
        const { productId, eventType } = req.body;
        const { userId } = req.user.id;

        const targetScore = EVENT_SCORES[eventType];

        await interactionModel.findOneAndUpdate(
            { userId, productId },
            {
                $max: { score: targetScore },
                $set: { lastUpdated: new Date() }
            },
            { upsert: true, new: true }
        )

        return res.json({
            success: true,
            message: "Successfully updated!"
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })

    }
}

const getRecommendations = async(req, res) =>{

    try {

        const {currentProductId} = req.params.productId;

        const allInteractions = await interactionModel.find();

        const matrix = {}

        allInteractions.forEach(inter => {
            if(!matrix[inter.productId]) matrix[inter.productId] = {};
            matrix[inter.productId][inter.userId] = inter.score
        })

        const targetVector = matrix[currentProductId];

        if(!targetVector){
            return res.json([])
        }

        const similarities = []

        Object.keys(matrix).forEach(prodId => {
            if(prodId == currentProductId ) return;

            const compareVector = matrix[prodId];

            let dotProduct = 0;

        })



        
    } catch (error) {
        
    }

}


export {trackEvent}