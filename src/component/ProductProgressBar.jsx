import React from "react";
import { ProgressBar } from "@progress/kendo-react-progressbars";
import { Card, CardBody, CardTitle } from "@progress/kendo-react-layout";

const ProductProgressBar = ({ productLength, expiredProdctLength }) => {
  return (
    <div className="mt-4 mb-4">
      {/* Heading Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Products Inventory Information</h2>
      </div>
      {/* Cards Section */}
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Card for Total Products */}
        <Card style={{ width: 300 }} type="info">
          <CardBody>
            <CardTitle>Total Products</CardTitle>
            <p>Number of products in the system.</p>
            <ProgressBar value={productLength} />
            <div className="mt-2">
              Value: <strong>{productLength}</strong>
            </div>
          </CardBody>
        </Card>

        {/* Card for Expired Products */}
        <Card style={{ width: 300 }} type="error">
          <CardBody>
            <CardTitle>Products close to Expiry</CardTitle>
            <p>Number of products that are close to expiry.</p>
            <ProgressBar value={expiredProdctLength} />
            <div className="mt-2">
              Value: <strong>{expiredProdctLength}</strong>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProductProgressBar;
