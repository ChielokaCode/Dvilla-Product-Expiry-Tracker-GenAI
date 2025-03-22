import React, { useState } from "react";
import { addProduct } from "./generateProducts";
import { Button } from "@progress/kendo-react-buttons";

const AIResponseAddProduct = ({ response }) => {
  const [notifStatus, setNotifStatus] = useState(false);
  const [error, setError] = useState(null);

  const extractField = (fieldName, response) => {
    const regex = new RegExp(`-\\s*${fieldName}:\\s*(.*)`, "i");
    const match = response.match(regex);
    return match ? match[1].trim() : "";
  };

  const extractFieldDate = (fieldName, response) => {
    const value = extractField(fieldName, response);
    return value ? new Date(value) : null; // Return Date object
  };

  // Extract product details from AI response dynamically
  const extractProductDetails = (responseText) => {
    return {
      productName: extractField("Name", responseText),
      productCategory: extractField("Category", responseText),
      productDescription: extractField("Description", responseText),
      productQuantity: 1, // Default quantity
      productBatchNo: extractField("Batch No", responseText),
      productManufactureDate: extractFieldDate("Mfg Date", responseText),
      productExpirationDate: extractFieldDate("Exp Date", responseText),
      productShelfAddedDate: new Date(), // Today
      createdDate: new Date().toISOString().split("T")[0],
      createdBy: "Admin",
      modifiedBy: null,
      modifiedDate: null,
    };
  };

  // Function to handle adding the product
  const handleAddProduct = () => {
    if (!response || typeof response !== "string") {
      setError("Invalid AI response");
      setNotifStatus(false);
      return;
    }
    try {
      const newProduct = extractProductDetails(response);
      addProduct(newProduct);
      setNotifStatus(true);
      setError(null);
    } catch (err) {
      setError("Error adding product");
      setNotifStatus(false);
    }
  };

  return (
    <div className="mt-4 p-3 bg-gray-100 border rounded">
      <strong>AI Response:</strong>
      <div className="whitespace-pre-line">
        {response
          .replace(/###\s*(.+)/g, "\n\n**$1**") // Convert ### headings to bold on a new line
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to HTML <strong>
          .split("\n")
          .map((line, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
      </div>

      {/* Add Product Button */}
      {response &&
        response !== "Something went wrong. Please try again." &&
        !response.includes("I'm unable to") && (
          <Button
            onClick={handleAddProduct}
            themeColor={"info"}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Product
          </Button>
        )}

      {/* Success / Error Message */}
      {notifStatus && (
        <p className="text-green-600 mt-2">Product added successfully!</p>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default AIResponseAddProduct;
