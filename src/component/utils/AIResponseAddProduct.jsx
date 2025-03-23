import React, { useState } from "react";
import { addProduct } from "./generateProducts";
import { Button } from "@progress/kendo-react-buttons";

const AIResponseAddProduct = ({ response }) => {
  const [notifStatus, setNotifStatus] = useState(false);
  const [error, setError] = useState(null);

  const extractProductDetails = (response) => {
    if (!response) return null;

    const lines = response.split("\n").map((line) => line.trim()); // Convert response into an array of lines

    const getValue = (label) => {
      const line = lines.find((l) =>
        l.toLowerCase().includes(label.toLowerCase())
      );
      if (!line) return null;

      const parts = line.split(":");
      let value = parts.length > 1 ? parts.slice(1).join(":").trim() : null;

      return value ? value.replace(/\*\*/g, "").trim() : null; // Remove ** formatting
    };

    return {
      productName: getValue("Product Name"),
      productCategory: getValue("Category"),
      productDescription: getValue("Description"),
      productQuantity: 1, // Default quantity
      productBatchNo: getValue("Batch No"),
      productManufactureDate: getValue("Mfg Date"),
      productExpirationDate: getValue("Exp Date"),
      createdDate: new Date(),
      createdBy: "Admin",
      modifiedBy: null,
      modifiedDate: null,
    };
  };

  // Function to handle adding the product
  const handleAddProduct = () => {
    try {
      const newProduct = extractProductDetails(response);
      if (!newProduct || !newProduct.productName) {
        throw new Error("Invalid product details");
      }

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
        {response.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
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
