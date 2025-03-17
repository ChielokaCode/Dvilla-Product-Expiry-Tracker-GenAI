import React, { useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { Checkbox } from "@progress/kendo-react-inputs";
import generateProducts from "./utils/generateProducts";
import ChatbotFloatingButton from "./ChatbotFloatingButton";

const ShowCloseToExpiryProducts = () => {
  const products = generateProducts().slice();
  const [scrollable, setScrollable] = useState("scrollable");
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [isPrintState, setIsPrintState] = React.useState(false);
  const [page, setPage] = React.useState(initialDataState);
  const [pageSizeValue, setPageSizeValue] = React.useState();

  const [columns, setColumns] = React.useState([
    { field: "id", title: "ID", width: 50, hidden: false },
    { field: "productName", title: "Name", width: 150, hidden: false },
    { field: "productCategory", title: "Category", width: 120, hidden: false },
    { field: "productQuantity", title: "Quantity", width: 100, hidden: false },
    { field: "productBatchNo", title: "Batch No", width: 100, hidden: false },
    {
      field: "productManufactureDate",
      title: "Manufacture Date",
      width: 120,
      hidden: false,
    },
    {
      field: "productExpirationDate",
      title: "Expiration Date",
      width: 120,
      hidden: false,
    },
    {
      field: "productShelfAddedDate",
      title: "Shelf Added Date",
      width: 120,
      hidden: false,
    },
    { field: "createdDate", title: "Created Date", width: 120, hidden: false },
    { field: "createdBy", title: "Created By", width: 100, hidden: false },
    { field: "modifiedBy", title: "Modified By", width: 100, hidden: false },
    {
      field: "modifiedDate",
      title: "Modified Date",
      width: 120,
      hidden: false,
    },
  ]);

  const [printColumns, setPrintColumns] = React.useState([
    { field: "id", title: "ID", width: 50, hidden: false },
    { field: "productName", title: "Name", width: 150, hidden: false },
    { field: "productCategory", title: "Category", width: 120, hidden: false },
    { field: "productQuantity", title: "Quantity", width: 120, hidden: false },
    // { field: "productBatchNo", title: "Batch No", width: 100, hidden: false },
    // {
    //   field: "productManufactureDate",
    //   title: "Manufacture Date",
    //   width: 120,
    //   hidden: false,
    // },
    {
      field: "productExpirationDate",
      title: "Expiration Date",
      width: 120,
      hidden: false,
    },
    {
      field: "productShelfAddedDate",
      title: "Shelf Added Date",
      width: 120,
      hidden: false,
    },
    // { field: "createdDate", title: "Created Date", width: 120, hidden: false },
    { field: "createdBy", title: "Created By", width: 100, hidden: false },
    // { field: "modifiedBy", title: "Modified By", width: 100, hidden: false },
    // {
    //   field: "modifiedDate",
    //   title: "Modified Date",
    //   width: 120,
    //   hidden: false,
    // },
  ]);

  const [columnsToPrint, setColumnsToPrint] = React.useState(
    printColumns.slice()
  );

  const [dimensions, setDimesions] = React.useState({
    height: "500px",
    width: "auto",
  });

  const print = () => {
    setPrintLayout();
    setTimeout(() => {
      window.print();
      setNormalLayout();
    });
  };

  const setPrintLayout = () => {
    setColumns(columnsToPrint);
    setDimesions({
      height: "100%",
      width: "100%",
    });
    setScrollable("none");
  };
  const setNormalLayout = () => {
    setColumns(columns);
    setDimesions({
      height: "500px",
      width: "auto",
    });
    setScrollable("scrollable");
  };

  const onChange = (event) => {
    const field = event.target.name;
    const newColumns = columnsToPrint.map((column) => {
      if (column.field === field) {
        return {
          ...column,
          hidden: !column.hidden,
        };
      }
      return column;
    });
    setColumnsToPrint(newColumns);
  };

  const pageChange = (event) => {
    const targetEvent = event.targetEvent;
    const take =
      targetEvent.value === "All" ? products.length : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };

  // Get today's date
  const today = new Date();

  // Calculate the date 2 months from today
  const twoMonthsLater = new Date();
  twoMonthsLater.setMonth(today.getMonth() + 2);

  // Filter products expiring within 2 months
  const closeToExpiryProducts = products.filter((product) => {
    const expiryDate = new Date(product.productExpirationDate);
    return expiryDate >= today && expiryDate <= twoMonthsLater;
  });

  return (
    <div id="showProduct">
      <div className="p-4 md:ml-64 ml-0 bg-gray-100">
        <h2 className="text-xl font-bold mb-4 print:hidden">
          Products within 2 months to Expiry
        </h2>

        {/* Checkbox for selecting columns */}
        <div className="mb-4 print:hidden">
          <h5 className="mb-2 print:hidden">Select Columns to Print:</h5>
          <div className="flex flex-wrap gap-4">
            {printColumns.map((column, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  type="checkbox"
                  id={column.field}
                  name={column.field}
                  defaultChecked={!column.hidden}
                  onChange={onChange}
                  label={column.title}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Print Button */}
        <Button
          onClick={print}
          className="mb-4 bg-blue-500 text-white print:hidden"
        >
          Print Expiry Products
        </Button>

        <div className="overflow-x-auto min-w-full border border-gray-300 bg-white shadow-md rounded-lg print:block">
          {!isPrintState && (
            <Grid
              style={dimensions}
              data={
                isPrintState
                  ? closeToExpiryProducts
                  : closeToExpiryProducts.slice(
                      page.skip,
                      page.take + page.skip
                    )
              }
              skip={page.skip}
              take={page.take}
              total={products.length}
              scrollable={scrollable}
              pageable={{
                buttonCount: 4,
                pageSizes: [5, 10, 15, "All"],
                pageSizeValue: pageSizeValue,
              }}
              onPageChange={pageChange}
              rowHeight={20}
            >
              {columns.map(
                (column, i) =>
                  !column.hidden && (
                    <Column
                      key={i}
                      field={column.field}
                      title={column.title}
                      width={column.width}
                    />
                  )
              )}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCloseToExpiryProducts;
