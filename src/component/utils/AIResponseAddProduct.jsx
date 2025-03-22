import React, { useState } from "react";
import { addProduct } from "./generateProducts";
import { Button } from "@progress/kendo-react-buttons";

const AIResponseAddProduct = ({ response }) => {
  const [notifStatus, setNotifStatus] = useState(false);
  const [error, setError] = useState(null);

  // Extract product details from AI response dynamically
  const extractProductDetails = (responseText) => {
    const extractField = (label) => {
      label = label.startsWith("** ") ? label.slice(2).trim() : label;
      const match = responseText.match(new RegExp(`${label}:\\s*(.+)`, "i"));
      return match ? match[1].trim().replace(/\s+/g, " ") : null; // Fix: Trim spaces properly
    };

    const extractFieldDate = (label) => {
      const match = responseText.match(
        new RegExp(
          `${label}(?:\\s*\\(.*?\\))?:\\s*(\\d{2,4})[/-](\\d{1,2})[/-]?(\\d{0,4})?`,
          "i"
        )
      );

      if (match) {
        let [_, part1, part2, part3] = match;
        let year, month, day;

        if (part1.length === 4) {
          year = part1;
          month = part2;
          day = part3 || "01";
        } else if (part3?.length === 4) {
          day = part1;
          month = part2;
          year = part3;
        } else if (part3?.length === 2) {
          day = part1;
          month = part2;
          year = `20${part3}`;
        } else {
          day = "01";
          month = part1;
          year = part2.length === 4 ? part2 : `20${part2}`;
        }

        // 🛠 Fix: Ensure month and day are always two digits
        month = month.padStart(2, "0");
        day = day.padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        const date = new Date(formattedDate);

        return isNaN(date.getTime())
          ? new Date()
          : date.toLocaleDateString("en-GB");
      }

      return new Date().toISOString().split("T")[0];
    };

    return {
      productName: extractField("Product Name"),
      productCategory: extractField("Category"),
      productDescription: extractField("Description"),
      productQuantity: 1, // Default quantity
      productBatchNo: extractField("Batch No"),
      productManufactureDate: extractFieldDate("Manufacture Date (Mfg. Date)"),
      productExpirationDate: extractFieldDate("Expiration Date (Exp. Date)"),
      productShelfAddedDate: new Date().toISOString().split("T")[0], // Today
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
