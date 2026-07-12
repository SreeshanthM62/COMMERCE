import "dotenv/config";
import mongoose from "mongoose"; // Ensure mongoose connection is established elsewhere in your app
import productModel from "../models/productModel.js";
import { generateMetadata, create_embeddings } from "../controllers/aiController.js";


const migrateProducts = async () => {
    try {

        await mongoose.connect(MONGODB_URI);
        console.log("🔗 Database connected successfully.");


        const products = await productModel.find();
        console.log(`Found ${products.length} products to update...`);

        // 1. FIXED: Changed 'for...in' to 'for...of'
        for (const product of products) {
            
            // Generate raw metadata string from Groq
            const rawMetadataStr = await generateMetadata({
                name: product.name,
                description: product.description,
                category: product.category,
                subCategory: product.subCategory,
                color: product.color
            });

            // 2. FIXED: Parse the string returned by the controller into an object
            const metadata = JSON.parse(rawMetadataStr);

            // Construct structural search text payload
            // Safe fallback logic using ?. and || [] ensures join doesn't break if properties missing
            const searchText = `
Product Name:
${product.name}

Description:
${product.description}

Category:
${product.category}

Subcategory:
${(product.subCategory || []).join(", ")}

Color:
${product.color}

Tags:
${(metadata.tags || []).join(", ")}

Occasions:
${(metadata.occasions || []).join(", ")}

Style:
${(metadata.style || []).join(", ")}

Search Keywords:
${(metadata.search_keywords || []).join(", ")}
`;

            // 3. FIXED: Changed function name from createEmbedding to create_embeddings
            const embedding = await create_embeddings(searchText);

            // Persist changes back into MongoDB
            await productModel.findByIdAndUpdate(product._id, {
                tags: metadata.tags,
                occasions: metadata.occasions,
                style: metadata.style,
                search_keywords: metadata.search_keywords,
                searchText,
                embedding
            });

            console.log(`✅ ${product.name} updated successfully.`);
        }

        console.log("🚀 Migration Completed Successfully");
    } catch (error) {
        console.error("❌ Migration failed with error:", error);
    }
};

migrateProducts();