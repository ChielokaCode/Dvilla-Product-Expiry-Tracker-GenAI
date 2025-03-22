import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import OpenAI from "openai";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { cameraIcon, paperPlaneIcon } from "@progress/kendo-svg-icons";
import AIResponseAddProduct from "./utils/AIResponseAddProduct";

const WebCapturebot = () => {
  const webcamRef = useRef(null);
  const chatEndRef = useRef(null);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [response, setResponse] = useState("");
  const [isCaptured, setIsCaptured] = useState(false);

  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const capture = () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setIsCaptured(true);

      // Add captured image to chat history
      setChatHistory([
        ...chatHistory,
        { role: "user", type: "image", content: imageSrc },
      ]);
    } catch (e) {
      console.error("Capture failed", e);
      setIsCaptured(false);
    }
  };

  const handleAskAI = async () => {
    if (!input.trim() && !imgSrc) return;
    setLoading(true);
    const prompt =
      input || "Extract Product Name, Description, Mfg Date, Exp Date";

    const newMessages = [...chatHistory, { role: "user", content: prompt }];
    setChatHistory(newMessages);
    setInput("");

    try {
      const messages = [
        {
          role: "system",
          content: `Extract Product Name, Description, Mfg Date, Exp Date`,
        },
        ...newMessages,
      ];
      if (imgSrc) {
        messages.push({
          role: "user",
          content: [{ type: "image_url", image_url: { url: imgSrc } }],
        });
      }

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
      });

      const textResponse =
        completion?.choices?.[0]?.message?.content ||
        "I couldn't process that properly.";
      setChatHistory([
        ...newMessages,
        { role: "assistant", content: textResponse },
      ]);
      setResponse(textResponse);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const videoConstraints = {
    facingMode: "environment",
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen max-w-4xl mx-auto border rounded-lg shadow-lg">
      {/* Webcam Area (Left) */}
      <div className="flex flex-col items-center p-4 bg-white border-b sm:border-r w-full sm:w-[200px]">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="border-1 rounded-lg shadow-lg"
          mirrored={false}
          style={{ width: "100%", maxWidth: 320, height: 240 }}
        />

        {response &&
          response !== "Something went wrong. Please try again." &&
          !response.includes("I'm unable to") && (
            <AIResponseAddProduct response={response} />
          )}
      </div>

      {/* Chat Area (Right) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } my-2`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs shadow-md ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.type === "image" ? (
                  <img
                    src={msg.content}
                    alt="Captured"
                    className="rounded-lg w-full"
                  />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Section */}
        <div className="p-4 border-t bg-white flex items-center space-x-2">
          <Button
            onClick={capture}
            className="bg-gray-300 text-black p-2 rounded-lg"
          >
            <SvgIcon icon={cameraIcon} size="medium" />
          </Button>
          <Input
            type="text"
            className="flex-1 border rounded-lg p-2"
            placeholder="Ask AI something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
          />
          <Button
            onClick={handleAskAI}
            themeColor={"info"}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? (
              "Thinking..."
            ) : (
              <SvgIcon icon={paperPlaneIcon} size="medium" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebCapturebot;
