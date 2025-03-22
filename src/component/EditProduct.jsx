import React, { useCallback, useEffect, useState } from "react";
import ToolbarContainer from "./utils/ToolbarContainer";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Notification } from "@progress/kendo-react-notification";
import { editProduct } from "./utils/generateProducts";
import { useParams } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import TextBox from "./TextBox";

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from URL
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productBatchNo, setProductBatchNo] = useState("");
  const [productManufactureDate, setProductManufactureDate] = useState(null);
  const [productExpiryDate, setProductExpiryDate] = useState(null);
  const [productShelfDate, setProductShelfDate] = useState(null);
  const [notifStatus, setNotifStatus] = useState(false);
  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const editorRef = React.useRef(null);

  useEffect(() => {
    if (notifStatus) {
      const timer = setTimeout(() => {
        setNotifStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifStatus]);

  const getProductById = (id) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    return products.find((product) => product.id === parseInt(id));
  };

  const handleEditProduct = useCallback(
    (id) => {
      const productToEdit = getProductById(id);
      if (productToEdit) {
        setSelectedProduct(productToEdit);
        setProductName(productToEdit.productName);
        setProductCategory(productToEdit.productCategory);
        setProductQuantity(productToEdit.productQuantity);
        setProductDescription(productToEdit.productDescription);
        setProductBatchNo(productToEdit.productBatchNo);
        // Convert string dates to Date objects (handle invalid cases)
        setProductManufactureDate(
          productToEdit.productManufactureDate
            ? new Date(productToEdit.productManufactureDate)
            : null
        );
        setProductExpiryDate(
          productToEdit.productExpirationDate
            ? new Date(productToEdit.productExpirationDate)
            : null
        );
        setProductShelfDate(
          productToEdit.productShelfAddedDate
            ? new Date(productToEdit.productShelfAddedDate)
            : null
        );
      }
    },
    [] // No dependencies, so it only initializes once
  );

  useEffect(() => {
    if (id) {
      handleEditProduct(id);
    }
  }, [id, handleEditProduct]); // Now React won't complain

  const formatDate = (date) =>
    date instanceof Date && !isNaN(date.getTime())
      ? date.toISOString().split("T")[0] // Extract YYYY-MM-DD
      : "";

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    try {
      if (!selectedProduct) return setError("No product selected!");

      const updatedProduct = {
        ...selectedProduct, // Keep existing product details
        productName,
        productCategory,
        productQuantity: Number(productQuantity),
        productDescription,
        productBatchNo,
        productManufactureDate: formatDate(productManufactureDate),
        productExpirationDate: formatDate(productExpiryDate),
        productShelfAddedDate: formatDate(productShelfDate),
      };

      const success = editProduct(updatedProduct);

      if (success) {
        setSelectedProduct(null); // Reset selection
        setProductName("");
        setProductCategory("");
        setProductQuantity(0);
        setProductDescription("");
        setProductBatchNo("");
        setProductManufactureDate(null);
        setProductExpiryDate(null);
        setProductShelfDate(null);
        setNotifStatus(true);
      } else {
        setError("Error: Product not found!");
      }
    } catch (e) {
      setError("Error editing Product");
    }
  };

  const productCategoryList = ["Beverages", "Food", "Drugs"];

  return (
    <div id="editProduct">
      {/* Notification */}
      {error && (
        <Notification closable={true} type={{ style: "error", icon: true }}>
          {error}
        </Notification>
      )}
      {notifStatus && (
        <Notification closable={true} type={{ style: "success", icon: true }}>
          Product edited Successfully
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
            Edit Product
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
          {/* Form Edit Producct */}
          {/* Product Name */}
          <form onSubmit={(e) => handleUpdateProduct(e)}>
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
                id="productCategory"
                name="productCategory"
                value={productCategory}
                data={productCategoryList}
                defaultValue="Drugs"
                onChange={(e) => setProductCategory(e.target.value)}
              />
            </div>
            {/* Product quantity */}
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
              <Label className="font-medium" editorId="productManufactureDate">
                Manufacture Date&nbsp;
              </Label>
              <div className="mt-2">
                <DatePicker
                  id="productManufactureDate"
                  name="productManufactureDate"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  value={productManufactureDate || null}
                  onChange={(e) => setProductManufactureDate(e.target.value)}
                />
              </div>
            </div>

            {/* Product Expiration Date */}
            <div>
              <Label className="font-medium" editorId="productExpiryDate">
                Expiry Date&nbsp;
              </Label>
              <div className="mt-2">
                <DatePicker
                  id="productExpiryDate"
                  name="productExpiryDate"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  value={productExpiryDate || null}
                  onChange={(e) => setProductExpiryDate(e.target.value)}
                />
              </div>
            </div>

            {/* Product Added To Shelf Date */}
            <div className="mb-4">
              <Label className="font-medium" editorId="productShelfDate">
                Shelf Date&nbsp;
              </Label>
              <div className="mt-2">
                <DatePicker
                  id="productShelfDate"
                  name="productShelfDate"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  value={productShelfDate || null}
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
                Edit Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
