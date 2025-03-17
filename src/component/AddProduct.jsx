import React, { useEffect, useState } from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import TextBox from "./TextBox";
import { addProduct } from "./utils/generateProducts";
import { Notification } from "@progress/kendo-react-notification";
import { Button } from "@progress/kendo-react-buttons";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productBatchNo, setProductBatchNo] = useState("");
  const [productManufactureDate, setProductManufactureDate] = useState("");
  const [productExpiryDate, setProductExpiryDate] = useState("");
  const [productShelfDate, setProductShelfDate] = useState("");
  const [notifStatus, setNotifStatus] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (notifStatus) {
      const timer = setTimeout(() => {
        setNotifStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifStatus]);

  const productCategoryList = ["Beverages", "Food", "Drugs"];

  const handleAddProduct = (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        productName,
        productCategory,
        productDescription,
        productQuantity: Number(productQuantity), // Ensure it's a number
        productBatchNo,
        productManufactureDate,
        productExpirationDate: productExpiryDate, // Match naming convention
        productShelfAddedDate: productShelfDate,
        createdDate: new Date().toISOString().split("T")[0], // Current date
        createdBy: "Admin", // Replace with actual user info if needed
        modifiedBy: null,
        modifiedDate: null,
      };

      addProduct(newProduct); // Call the function to add the product

      // Clear form fields after submission (optional)
      setProductName("");
      setProductCategory("");
      setProductQuantity("");
      setProductDescription("");
      setProductBatchNo("");
      setProductManufactureDate("");
      setProductExpiryDate("");
      setProductShelfDate("");
      setNotifStatus(true);

      // alert("Product added successfully!"); // Optional confirmation
    } catch (e) {
      setError("Error adding Product");
    }
  };

  return (
    <div id="addProduct">
      {/*Notification  */}
      {error && (
        <Notification closable={true} type={{ style: "error", icon: true }}>
          {error}
        </Notification>
      )}
      {notifStatus && (
        <Notification closable={true} type={{ style: "success", icon: true }}>
          Product added successfully!
        </Notification>
      )}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h4 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            D'Villa
          </h4> */}
          <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Add Product
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
          {/* Form Add Product */}
          <form onSubmit={(e) => handleAddProduct(e)}>
            {/* Product Name */}
            <div className="col-12 col-md-6 example-col">
              <Label className="font-medium" editorId="productName">
                Product Name&nbsp;
              </Label>
              <Input
                id="productName"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            {/* Product Category {Dropdown} */}
            <div className="space-y-1">
              <Label className="font-medium" editorId="productCategory">
                Product Category&nbsp;
              </Label>
              <DropDownList
                style={{
                  width: "390px",
                }}
                value={productCategory}
                data={productCategoryList}
                id="productCategory"
                name="productCategory"
                defaultValue="Beverages"
                onChange={(e) => setProductCategory(e.target.value)}
              />
            </div>
            {/* Product Quantity */}
            <div className="col-12 col-md-6 example-col">
              <Label className="font-medium" editorId="productQuantity">
                Product Quantity&nbsp;
              </Label>
              <Input
                id="productQuantity"
                name="productQuantity"
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>

            {/* Product Description {TextArea} */}
            <TextBox
              label={"Product Description"}
              labelHtmlFor={"productDescription"}
              id={"productDescription"}
              name={"productDescription"}
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />

            {/* Product Batch Number */}
            <div className="col-12 col-md-6 example-col">
              <Label className="font-medium" editorId="productBatchNo">
                Product Batch No&nbsp;
              </Label>
              <Input
                id="productBatchNo"
                name="productBatchNo"
                value={productBatchNo}
                onChange={(e) => setProductBatchNo(e.target.value)}
              />
            </div>

            {/* Product Manufacture Date */}
            <div>
              <Label className="font-medium" editorId="manufactureDate">
                Manufacture Date&nbsp;
              </Label>
              <div className="mt-2">
                <DatePicker
                  value={productManufactureDate}
                  id="manufactureDate"
                  name="manufactureDate"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  onChange={(e) => setProductManufactureDate(e.target.value)}
                />
              </div>
            </div>

            {/* Product Expiration Date */}
            <div>
              <Label className="font-medium" editorId="expiryDate">
                Expiry Date&nbsp;
              </Label>
              <div className="mt-2">
                <DatePicker
                  value={productExpiryDate}
                  id="expiryDate"
                  name="expiryDate"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  onChange={(e) => setProductExpiryDate(e.target.value)}
                />
              </div>
            </div>

            {/* Product Added To Shelf Date */}
            <div className="mb-4">
              <Label className="font-medium" editorId="shelfDate">
                Shelf Date&nbsp;
              </Label>
              <div className="mt-2">
                <DatePicker
                  value={productShelfDate}
                  id="shelfDate"
                  name="shelfDate"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  onChange={(e) => setProductShelfDate(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                themeColor={"info"}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
