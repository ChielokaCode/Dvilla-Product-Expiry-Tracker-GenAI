import React, { useState } from "react";
import TextBox from "./TextBox";
import { Button } from "@progress/kendo-react-buttons";
import AIResponseAddProduct from "./utils/AIResponseAddProduct";
import OpenAI from "openai";

const WebCapturebot = ({ base64 }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleAskAI = async () => {
    setLoading(true);
    const prompt =
      input ||
      "Extract Product Name, Description, Category, Batch No, Manufacture Date (Mfg. Date), Expiration Date (Exp.Date)";

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: base64,
                },
              },
            ],
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
      <h2 className="text-xl font-bold">AI WebCapture Bot</h2>

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

      {/* AI Response Add Product */}
      <AIResponseAddProduct response={response} />
    </div>
  );
};

export default WebCapturebot;
