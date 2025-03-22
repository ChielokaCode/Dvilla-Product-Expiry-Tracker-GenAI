import React, { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import generateProducts from "./utils/generateProducts";
import { Slide, Fade, Zoom } from "@progress/kendo-react-animation";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const products = generateProducts(); // Generate product data

  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const today = new Date().toISOString().split("T")[0];
  const productList = products
    .map(
      (item) =>
        `${item.productName}, Qty: ${item.productQuantity} (expires on ${item.productExpirationDate})`
    )
    .join("\n");

  useEffect(() => {
    // Auto-scroll to the latest message
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Add AI greeting on first load
    if (chatHistory.length === 0) {
      setChatHistory([
        {
          role: "assistant",
          content:
            "Hello there! 😊 I'm your AI assistant. Ask me anything about your products!",
        },
      ]);
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const newMessages = [...chatHistory, { role: "user", content: input }];
    setChatHistory(newMessages);
    setInput("");

    const messages = [
      {
        role: "system",
        content: `You are a friendly AI assistant helping supermarket managers track inventory.
        Provide helpful and concise responses. Today's date: ${today}
        Here is the inventory: ${productList}`,
      },
      ...newMessages,
    ];

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
      });

      const textResponse =
        completion?.choices?.[0]?.message?.content || "No response from AI";

      setChatHistory([
        ...newMessages,
        { role: "assistant", content: textResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory([
        ...newMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto border rounded-lg shadow-lg">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {chatHistory.map((msg, index) => (
          <Slide key={index} direction={msg.role === "user" ? "right" : "left"}>
            <Fade transitionDuration={300 + index * 100}>
              <Zoom transitionDuration={300} /* Adding bounce effect */>
                <div
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } my-2`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs shadow-md transition-all duration-500 ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </Zoom>
            </Fade>
          </Slide>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* User Input Box */}
      <div className="p-4 border-t bg-white flex items-center">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2 outline-none"
          placeholder="Ask AI something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
