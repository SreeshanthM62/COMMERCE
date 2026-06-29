import userModel from "../models/userModel.js";

const toggleWishlist = async (req, res) => {

    try {

        const { productId } = req.body;
        const userId = req.user.id

        const user = await userModel.findById(userId)

        const exists = user.wishlist.includes(productId)

        if (exists) {
            user.wishlist = user.wishlist.filter(
                item => item.toString() != productId
            )
        }
        else {
            user.wishlist.push(productId)
        }

        await user.save();

        return res.json({
            success: true,
            wishlist: user.wishlist
        })

    }


    catch (error) {

        return res.json({
            success: false,
            message: error.message
        })

    }
}

const getWishlist = async (req, res) => {
    try {

        const userId = req.user.id

        const user = await userModel.findById(userId)

        return res.json({
            success: true,
            wishlist: user.wishlist
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
        
    }
}

export {toggleWishlist, getWishlist}

