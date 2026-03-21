// add products to user cart

import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {

    try {

        const userId = req.user.id
        const { itemId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData



        if (cartData[itemId]) {
            cartData[itemId] += 1
        }
        else {
            cartData[itemId] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// Update user CART
const updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId, quantity } = req.body;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // ✅ Ensure cartData exists
        let cartData = userData.cartData || {};

        // ✅ UPDATE quantity properly
        cartData[itemId] = quantity;

        await userModel.findByIdAndUpdate(
            userId,
            { cartData },
            { new: true }
        );

        res.json({
            success: true,
            message: "Cart updated successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET USER CART DATA
const getUserCart = async (req, res) => {
    try {

        const userId = req.user.id
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            cartData: user.cartData || {}
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




export { addToCart, updateCart, getUserCart }
