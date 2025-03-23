import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import generateProducts, { deleteProduct } from "./utils/generateProducts";
import { Notification } from "@progress/kendo-react-notification";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

const ShowProduct = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [notifStatus, setNotifStatus] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLoader, setShowLoader] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const products = generateProducts().slice();

  React.useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setData(products);
    }, 2000);
  }, []);

  useEffect(() => {
    if (notifStatus) {
      const timer = setTimeout(() => {
        setNotifStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifStatus]);

  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };

  // Handle row click to open modal
  const handleRowClick = (event) => {
    setSelectedProduct(event.dataItem);
    setProductToDelete(event.dataItem);
    setVisibleDialog(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setVisibleDialog(false);
    setSelectedProduct(null);
  };

  const handleDelete = (productId) => {
    setDeleteProductId(productId);

    setShowDeleteModal(true);
    setVisibleDialog(false);
    closeModal();
  };

  const confirmDelete = () => {
    try {
      deleteProduct(deleteProductId);
      setData(data.filter((product) => product.id !== productToDelete.id));
      setNotifStatus(true);
      setShowDeleteModal(false);
    } catch (e) {
      setError("Error deleting Product");
    }
  };

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
          <Grid
            style={{
              height: "365px",
            }}
            onRowClick={handleRowClick}
            dataItemKey="id"
            data={data}
            autoProcessData={true}
            navigatable={true}
            filterable={true}
            showLoader={showLoader}
            sortable={{
              allowUnsort: true,
              mode: "single",
            }}
            defaultSort={[
              {
                field: "ProductName",
                dir: "desc",
              },
            ]}
          >
            <Column field="id" title="ID" filterable={false} width="40px" />
            <Column field="productName" title="Product Name" width="240px" />
            <Column
              field="productCategory"
              title="Product Category"
              width="220px"
            />
            <Column
              field="productDescription"
              width="220px"
              title="Product Description"
            />
            <Column
              field="productQuantity"
              filter="numeric"
              title="Product Quantity"
              width="150px"
            />
            <Column
              field="productBatchNo"
              title="Product Batch No"
              width="220px"
            />
            <Column
              field="productManufactureDate"
              title="Manufacture Date"
              width="220px"
              filter="date"
              format="{0:d}"
            />
            <Column
              field="productExpirationDate"
              title="Expiration Date"
              width="220px"
              filter="date"
              format="{0:d}"
            />
            <Column
              field="productShelfAddedDate"
              title="Shelf Date"
              width="220px"
              filter="date"
              format="{0:d}"
            />
            <Column
              field="createdDate"
              title="Created Date"
              width="220px"
              filter="date"
              format="{0:d}"
            />
            <Column field="createdBy" title="Created By" width="220px" />
            <Column field="modifiedBy" title="Modified By" width="220px" />
            <Column
              field="modifiedDate"
              title="Modified Date"
              width="220px"
              filter="date"
              format="{0:d}"
            />
          </Grid>

          {/* Modal for Edit/Delete */}
          {visibleDialog && selectedProduct && (
            <Dialog title={"Please confirm"} onClose={toggleDialog}>
              <p style={{ margin: "25px", textAlign: "center" }}>
                Actions for {selectedProduct.productName}
              </p>
              <DialogActionsBar>
                <Button themeColor="info">
                  <Link
                    to={`/dashboard/editProduct/${selectedProduct.id}`}
                    className="text-white px-3 py-1 rounded-md "
                  >
                    Edit
                  </Link>
                </Button>
                <Button
                  onClick={() => handleDelete(selectedProduct.id)}
                  themeColor="error"
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </Button>
              </DialogActionsBar>
            </Dialog>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Dialog
          title={"Please confirm"}
          onClose={() => setShowDeleteModal(false)}
        >
          <p style={{ margin: "25px", textAlign: "center" }}>
            Are you sure you want to delete?
          </p>
          <DialogActionsBar>
            <Button themeColor="info" onClick={confirmDelete}>
              Delete
            </Button>
            <Button
              onClick={() => setShowDeleteModal(false)}
              themeColor="base"
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Cancel
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default ShowProduct;
