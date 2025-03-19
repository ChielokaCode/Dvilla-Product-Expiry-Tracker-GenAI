import React, { useState } from "react";
import TextBox from "./TextBox";
import generateProducts from "./utils/generateProducts";
import { Button } from "@progress/kendo-react-buttons";

import OpenAI from "openai";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const products = generateProducts(); // Generate product data

  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleAskAI = async () => {
    setLoading(true);
    const prompt =
      input ||
      "Give a summary of expired products. Let all date be in a human readable sentence";
    try {
      // Format expired products
      const productList = products
        .map(
          (item) =>
            `${item.productName}, Qty: ${item.productQuantity} (expires on ${item.productExpirationDate})`
        )
        .join("\n");

      const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format
      // Call OpenAI API
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
            You are an friendly AI assistant expert that helps supermarket managers track and manage expired products.
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
            content: `Here is a list of expired products:\n${productList}\n\n${prompt}`,
          },
        ],
      });

      const textResponse =
        completion?.choices?.[0]?.message?.content || "No response from AI";
      setResponse(textResponse);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto mt-12">
      <h2 className="text-xl font-bold">AI Chatbot</h2>

      <TextBox
        label={"Enter your question"}
        labelHtmlFor={"userInput"}
        id={"userInput"}
        name={"userInput"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI something..."
      />

      <Button
        onClick={handleAskAI}
        themeColor={"info"}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </Button>

      {response && typeof response === "string" && (
        <div className="mt-4 p-3 bg-gray-100 border rounded whitespace-pre-line">
          <strong>AI Response:</strong>
          {response
            .replace(/###\s*(.+)/g, "\n\n**$1**") // Convert ### headings to bold on a new line
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to HTML <strong>
            .split("\n")
            .map((line, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
