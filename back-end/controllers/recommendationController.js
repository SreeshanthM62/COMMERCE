import interactionModel from "../models/interactionModel.js";
import productModel from "../models/productModel.js";

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

const getRecommendations = async (req, res) => {

    try {

        const currentProductId = req.params.productId;

        const allInteractions = await interactionModel.find();

        const matrix = {}

        allInteractions.forEach(inter => {
            if (!matrix[inter.productId]) matrix[inter.productId] = {};
            matrix[inter.productId][inter.userId] = inter.score
        })

        const targetVector = matrix[currentProductId];

        if (!targetVector) {
            return res.json([])
        }

        const similarities = []

        Object.keys(matrix).forEach(prodId => {
            if (prodId == currentProductId) return;

            const compareVector = matrix[prodId];

            let dotProduct = 0;
            let magA = 0;
            let magB = 0;

            const allUsers = new Set([...Object.keys(targetVector), ...Object.keys(compareVector)]);

            allUsers.forEach(uId => {
                const valA = targetVector[uId] || 0;
                const valB = compareVector[uId] || 0;

                dotProduct += valA * valB;
                magA += valA * valA;
                magB += valB * valB;
            });

            const similarity = dotProduct / (Math.sqrt(magA) * Math.sqrt(magB) || 1);

            if (similarity > 0) {
                similarities.push({ productId: prodId, similarity });
            }


        })

        similarities.sort((a, b) => b.similarity - a.similarity);
        const topProductIds = similarities.slice(0, 4).map(s => s.productId);


        const recommendedProducts = await productModel.find({ _id: { $in: topProductIds } });

        return res.json({success: true, recommendedProducts});


    } catch (error) {
        return res.json({ error: error.message });
    }

}


export { trackEvent, getRecommendations }