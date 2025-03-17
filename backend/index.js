import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import OpenAI from "openai";

import { config } from "dotenv";
config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

connect(process.env.MONGO_URI);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env (backend)
});

//GenAI summary
app.post("/api/generate-summary", async (req, res) => {
  try {
    const { expiredProducts, userInput, pageSize = 10, page = 1 } = req.body;

    if (!Array.isArray(expiredProducts)) {
      return res
        .status(400)
        .json({ error: "Invalid or missing expired Products array" });
    }

    // Paginate products
    const start = (page - 1) * pageSize;
    const paginatedProducts = expiredProducts.slice(start, start + pageSize);

    // Format expired products
    const productList = paginatedProducts
      .map(
        (item) =>
          `${item.productName}, Qty: ${item.productQuantity} (expires on ${item.productExpirationDate})`
      )
      .join("\n");

    const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are an AI assistant expert that helps supermarket managers track and manage expired products.
            You will receive a list of expired products, along with user queries, and provide concise,
            insightful summaries and actionable steps. Your response should be clear, professional,
            and helpful. If a product has expired recently compared to today's date (${today}) in format YYYY-MM-DD,
            suggest whether to remove it from shelves, return it to suppliers, or apply proper disposal methods.
            Using the remaining product Quantity, predict if the supermarket can finish selling the product before its expiry date.
            If there are patterns in expired products, suggest inventory improvements to reduce waste.
            Your response should not be more than 250 words.`,
        },
        {
          role: "user",
          content: `Here is a list of expired products:\n${productList}\n\n${userInput}`,
        },
      ],
    });

    const aiResponse =
      completion?.choices?.[0]?.message?.content || "No response received";
    res.json({ summary: aiResponse });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

//Extract text
app.post("/api/extract-text", async (req, res) => {
  try {
    const { baseImage, userInput } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: userInput },
            {
              type: "image_url",
              image_url: {
                url: baseImage,
              },
            },
          ],
        },
      ],
    });
    const aiResponse =
      completion?.choices?.[0]?.message?.content || "No response received";
    res.json({ summary: aiResponse });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to extract Product Details" });
  }
});

//get test cron
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is alive!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running");
});
