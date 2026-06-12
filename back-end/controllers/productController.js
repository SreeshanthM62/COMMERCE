import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
    try {

        let { name, description, price, category, subCategory, color, bestSeller, date } = req.body;

        let parsedSubCategory = JSON.parse(req.body.subCategory);
            

        const image1 = req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files.image4 ? req.files.image4[0] : null;


        const images = [image1, image2, image3, image4].filter((item) => item != undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )
        subCategory = parsedSubCategory;

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            color,
            image: imagesUrl,
            date: Date.now()

        }

        console.log(productData)

        const product = new productModel(productData)
        await product.save();

        res.json({ success: true, message: "Product Added" })

        console.log(name, description, price, category, subCategory, color, bestSeller, date);

        console.log(images);





    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// function for lIST productS
const listProducts = async (req, res) => {

    try {

        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// function for Remove product
const removeProduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// function for Single Product Info product
const singleProduct = async (req, res) => {

    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)

        res.json({ success: true, product })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

const categoryProducts = async (req, res) => {
    try {

        const { category } = req.params;

        const products = await productModel.find({
            category: category
        });

        res.json({ success: true, products });
    } catch (error) {

        res.json({ success: false, message: error.message });

    }
}

export { addProduct, listProducts, removeProduct, singleProduct, categoryProducts }