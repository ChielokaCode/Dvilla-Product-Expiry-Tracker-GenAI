import React, { useState } from "react";
import TextBox from "./TextBox";
import generateProducts from "./utils/generateProducts";
import { Button } from "@progress/kendo-react-buttons";
import OpenAI from "openai";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // Stores conversation history
  const [loading, setLoading] = useState(false);
  const products = generateProducts(); // Generate product data

  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleAskAI = async () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format

    // Generate the product list
    const productList = products
      .map(
        (item) =>
          `${item.productName}, Qty: ${item.productQuantity} (expires on ${item.productExpirationDate})`
      )
      .join("\n");

    // Set up the initial greeting if it's the first message
    let messages = [];
    if (chatHistory.length === 0) {
      messages.push({
        role: "system",
        content: `
          You are a friendly AI assistant helping supermarket managers track and manage inventory.
          Start with a warm greeting if this is the user's first interaction.
          Provide helpful and concise responses based on the product inventory below.
          If the user asks about expired products, suggest whether to remove them, return to suppliers,
          or apply proper disposal methods. Predict if the supermarket can sell a product before its expiry date.
          If patterns in expired products exist, suggest inventory improvements.
          Today's date: ${today}
          Here is the current inventory:
          ${productList}
        `,
      });

      messages.push({
        role: "assistant",
        content: `Hello there! 😊 I'm your AI assistant here to help with your inventory. Ask me anything about your products!`,
      });
    }

    // Include previous conversation history
    messages = [...messages, ...chatHistory];

    // Add the user's latest question
    messages.push({
      role: "user",
      content:
        input ||
        "Give a summary of expired products. Format dates in human-readable sentences.",
    });

    try {
      // Call OpenAI API
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
      });

      const textResponse =
        completion?.choices?.[0]?.message?.content || "No response from AI";

      // Update chat history
      const updatedHistory = [
        ...messages,
        { role: "assistant", content: textResponse },
      ];
      setChatHistory(updatedHistory);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory([
        ...messages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
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

      <div className="mt-4 p-3 bg-gray-100 border rounded whitespace-pre-line">
        {chatHistory.map((msg, index) => (
          <p
            key={index}
            className={
              msg.role === "assistant"
                ? "text-blue-700 font-semibold"
                : "text-gray-800"
            }
          >
            <strong>{msg.role === "assistant" ? "AI:" : "You:"}</strong>{" "}
            {msg.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatBot;
