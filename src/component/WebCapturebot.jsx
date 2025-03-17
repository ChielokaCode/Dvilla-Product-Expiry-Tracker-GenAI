import React, { useState } from "react";
import TextBox from "./TextBox";
import { Button } from "@progress/kendo-react-buttons";
import AIResponseAddProduct from "./utils/AIResponseAddProduct";

const WebCapturebot = ({ base64 }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const serverUrl = "https://product-expiry-tracker-genai-backend.onrender.com";

  const handleAskAI = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/api/extract-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseImage: base64,
          userInput:
            input ||
            "Extract Product Name, Description, Category, Batch No, Manufacture Date (Mfg. Date), Expiration Date (Exp.Date)",
        }),
      });

      const data = await res.json();
      setResponse(data.summary);
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
