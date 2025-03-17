import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import generateProducts, { deleteProduct } from "./utils/generateProducts";
import ChatbotFloatingButton from "./ChatbotFloatingButton";
import { Notification } from "@progress/kendo-react-notification";
import { Button } from "@progress/kendo-react-buttons";

const ShowProduct = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
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

  const handleDelete = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    try {
      deleteProduct(deleteProductId);
      setNotifStatus(true);
      setShowDeleteModal(false);
    } catch (e) {
      setError("Error deleting Product");
    }
  };

  const products = generateProducts().slice();

  return (
    <div id="showProduct">
      {/* Notification */}
      {error && (
        <Notification
          className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8"
          closable={true}
          type={{ style: "error", icon: true }}
        >
          {error}
        </Notification>
      )}
      {notifStatus && (
        <Notification closable={true} type={{ style: "success", icon: true }}>
          Product Deleted successfully!
        </Notification>
      )}
      <div className="p-4 md:ml-64 ml-0 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Product List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Batch No</th>
                <th className="border px-4 py-2">Manufacture Date</th>
                <th className="border px-4 py-2">Expiration Date</th>
                <th className="border px-4 py-2">Shelf Added Date</th>
                <th className="border px-4 py-2">Created Date</th>
                <th className="border px-4 py-2">Created By</th>
                <th className="border px-4 py-2">Modified By</th>
                <th className="border px-4 py-2">Modified Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border">
                  <td className="border px-4 py-2">{product.id}</td>
                  <td className="border px-4 py-2">{product.productName}</td>
                  <td className="border px-4 py-2">
                    {product.productCategory}
                  </td>
                  <td className="border px-4 py-2">
                    {product.productQuantity}
                  </td>
                  <td className="border px-4 py-2">{product.productBatchNo}</td>
                  <td className="border px-4 py-2">
                    {product.productManufactureDate.split("T")[0]}
                  </td>
                  <td className="border px-4 py-2">
                    {product.productExpirationDate.split("T")[0]}
                  </td>
                  <td className="border px-4 py-2">
                    {product.productShelfAddedDate.split("T")[0]}
                  </td>
                  <td className="border px-4 py-2">{product.createdDate}</td>
                  <td className="border px-4 py-2">{product.createdBy}</td>
                  <td className="border px-4 py-2">{product.modifiedBy}</td>
                  <td className="border px-4 py-2">{product.modifiedDate}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <Button themeColor={"info"}>
                      <Link
                        to={`/dashboard/editProduct/${product.id}`}
                        className=" text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      themeColor={"error"}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProduct;
