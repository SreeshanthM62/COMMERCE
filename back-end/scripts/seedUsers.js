import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
// import "../config/mongodb.js";
import userModel from "../models/userModel.js";
import personas from "../config/personas.js";

// await connectDB();

const MONGODB_URI = "mongodb+srv://sreeshanth_m:mongodb6@website-cluster.cdgpeor.mongodb.net/commerce?appName=website-cluster"

async function seedUsers(){


    try{

        // if (!process.env.MONGODB_URI) {
        //     throw new Error("MONGO_URI is missing from your .env file or the path is incorrect.");
        // }

        // 3. Connect using your env variable
        await mongoose.connect(MONGODB_URI);
        console.log("🔗 Database connected successfully.");

        await userModel.deleteMany({
            email:{
                $regex:"@fake.com"
            }
        });

        console.log("Deleted all users with @fake.com")
    }

    catch(error){

        console.log(error);

    }

}

seedUsers();