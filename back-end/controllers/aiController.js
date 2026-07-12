import "dotenv/config"
import Groq from "groq-sdk";
import axios from "axios"



const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})


export const generateMetadata = async (product) => {

    const prompt = `
You are an ecommerce search optimization expert.

For The Given Product Details Generate tags, occasions, style, search_keywords

Generate ONLY valid JSON.

Product Name: ${product.name}

Description: ${product.description}

Category: ${product.category}

Subcategory: ${product.subCategory.join(", ")}

Color: ${product.color}

Return this format:

{
  "tags": [],
  "occasions": [],
  "style": [],
  "search_keywords": []
}

`;

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        messages: [
            {
                role: "system",
                content: "You are an ecommerce search optimization expert."
            },
            { role: "user", content: prompt }
        ],
        temperature: 0.7,
    })

    const content = response.choices[0].message.content
    return content


}

export const create_embeddings = async(text)=>{
    try {
        const response = await axios.post("http://localhost:11434/api/embed", {
            "model": "nomic-embed-text",
            "input": text 
        });

        
        if (response.data && response.data.embeddings) {
            return response.data.embeddings[0]; 
        }
        
        throw new Error("Unexpected response structure from Ollama");
    } catch (error) {
        console.error("Embedding generation failed:", error.message);
        throw error;
    }
}

const searchText = `Product Name:
Lily Luxe Bouquet

Description:
A handcrafted bouquet featuring elegant pink lily blooms, delicate flo…

Category:
Bouquet

Subcategory:
Lily

Color:
pink

Tags:
Lily, Pink, Bouquet, Handcrafted, Elegant, Floral, Luxury

Occasions:
Anniversary, Birthday, Wedding, Valentine's Day, Mother's Day

Style:
Classic, Romantic, Elegant, Luxurious

Search Keywords:
pink lily bouquet, lily flower arrangement, luxury bouquet, handcrafted flowers, elegant floral gift`

// const run = async()=>{
//     const result = await create_embeddings(searchText)
//     console.log("Generated Vector Embedding:", result)
//     return result;
// }

// run();

// const prodDetails ={
//   "_id": "6a2c3059871e69022c621f8f", 
//   "name": "Cerulean Daisy Bloom Pot",
//   "description": "A charming, handcrafted pipe cleaner display featuring a cluster of de…",
//   "price": 61,
//   "image": [],
//   "category": "flower-pots",
//   "subCategory": ["Daisy"],
//   "color": "blue",
//   "bestSeller": false,
//   "date": 1781284469881,
//   "__v": 0,
//   "relatedProducts": []
// }


// const run = async()=>{
//     const response = await generateMetadata(prodDetails)
//     const metadata = JSON.parse(response)
//     console.log(metadata)
// }

// run()