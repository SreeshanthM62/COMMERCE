import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
// import "../config/mongodb.js";
import userModel from "../models/userModel.js";
import personas from "../config/personas.js";

// await connectDB();



async function seedUsers(){


    try{

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGO_URI is missing from your .env file or the path is incorrect.");
        }

        // 3. Connect using your env variable
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("🔗 Database connected successfully.");

        await userModel.deleteMany({
            email:{
                $regex:"@fake.com"
            }
        });

        const hashedPassword = await bcrypt.hash("123456", 10);

        for(let i=0;i<150;i++){

            const randomPersona = personas[Math.floor(Math.random() * personas.length)];

            const firstName=faker.person.firstName();
            const lastName=faker.person.lastName();

            await userModel.create({

                name: `${firstName} ${lastName}`,
                email: `${firstName.toLowerCase()}${i}@fake.com`,
                password: hashedPassword, // Using pre-hashed password
                persona: randomPersona.name,    // Assigns the entire persona object correctly
                wishlist: [],
                cartData: {}
            });

        }

        console.log("150 Users Generated");

        process.exit();

    }

    catch(error){

        console.log(error);

    }

}

seedUsers();