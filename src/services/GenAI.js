import { useState } from "react";
import generateProducts from "../component/utils/generateProducts";

const GenAI = () => {
  const products = generateProducts();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-summary",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products,
            userInput: "Provide a detailed summary with recommended actions.",
          }),
        }
      );

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Expired Product Summary</h2>
      <button onClick={generateSummary} disabled={loading}>
        {loading ? "Generating..." : "Generate Summary"}
      </button>
      <p>{summary}</p>
    </div>
  );
};

export default GenAI;
