import React from "react";

import {
  ProductProgressBar,
  ShowProduct,
  SideBar,
} from "../../component/index";
import {
  getCloseToExpiryProductCount,
  getProductCount,
} from "../../component/utils/generateProducts";

const ShowProductPage = () => {
  const productLength = getProductCount();
  const productCloseToExpiry = getCloseToExpiryProductCount();
  return (
    <>
      <SideBar />
      <ProductProgressBar
        productLength={productLength}
        expiredProdctLength={productCloseToExpiry}
      />
      <ShowProduct />
    </>
  );
};

export default ShowProductPage;
