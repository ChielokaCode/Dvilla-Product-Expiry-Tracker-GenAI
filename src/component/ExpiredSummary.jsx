import React, { useState } from "react";
import { getAISummary } from "../services/openaiService";

const ExpiredSummary = ({ expiredProducts }) => {
  const [summary, setSummary] = useState("");

  const handleGenerateSummary = async () => {
    if (expiredProducts.length === 0) {
      setSummary("No expired products found.");
      return;
    }

    const aiSummary = await getAISummary(expiredProducts);
    setSummary(aiSummary);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Smart Summary</h2>
      <button
        onClick={handleGenerateSummary}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
        Generate Summary
      </button>
      {summary && (
        <div className="mt-4 p-3 bg-gray-100 border rounded">
          <strong>AI Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
};

export default ExpiredSummary;
