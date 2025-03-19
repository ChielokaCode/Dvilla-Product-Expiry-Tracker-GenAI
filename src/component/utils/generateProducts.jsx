// Function to generate initial products if local storage is empty
const generateProducts = () => {
  const existingProducts = JSON.parse(localStorage.getItem("products"));

  if (!existingProducts || existingProducts.length === 0) {
    const products = [
      {
        id: 1,
        productName: "Coca-Cola 500ml",
        productCategory: "Beverages",
        productDescription: "Refreshing carbonated soft drink.",
        productQuantity: 9,
        productBatchNo: "BATCH-202401",
        productManufactureDate: "2024-01-05",
        productExpirationDate: "2025-04-05",
        productShelfAddedDate: "2024-02-10",
        createdDate: "2024-03-01",
        createdBy: "Admin 1",
        modifiedBy: "Editor 1",
        modifiedDate: "2024-04-02",
      },
      {
        id: 2,
        productName: "Paracetamol Tablets 500mg",
        productCategory: "Drugs",
        productDescription: "Pain reliever and fever reducer.",
        productQuantity: 15,
        productBatchNo: "BATCH-202402",
        productManufactureDate: "2024-01-10",
        productExpirationDate: "2025-03-10",
        productShelfAddedDate: "2024-02-15",
        createdDate: "2024-03-05",
        createdBy: "Admin 2",
        modifiedBy: "Editor 2",
        modifiedDate: "2024-04-08",
      },
      {
        id: 3,
        productName: "Amoxicillin Capsules 250mg",
        productCategory: "Drugs",
        productDescription: "Antibiotic used to treat bacterial infections.",
        productQuantity: 1,
        productBatchNo: "BATCH-202403",
        productManufactureDate: "2024-01-12",
        productExpirationDate: "2025-05-12",
        productShelfAddedDate: "2024-02-18",
        createdDate: "2024-03-07",
        createdBy: "Admin 1",
        modifiedBy: "Editor 1",
        modifiedDate: "2024-04-10",
      },
      {
        id: 4,
        productName: "Indomie Instant Noodles 70g",
        productCategory: "Food",
        productDescription: "Instant noodles with chicken flavor.",
        productQuantity: 28,
        productBatchNo: "BATCH-202404",
        productManufactureDate: "2024-01-20",
        productExpirationDate: "2025-07-20",
        productShelfAddedDate: "2024-02-22",
        createdDate: "2024-03-11",
        createdBy: "Admin 3",
        modifiedBy: "Editor 2",
        modifiedDate: "2024-04-15",
      },
      {
        id: 5,
        productName: "Vitamin C Tablets 1000mg",
        productCategory: "Drugs",
        productDescription: "Boosts immunity and antioxidant support.",
        productQuantity: 21,
        productBatchNo: "BATCH-202405",
        productManufactureDate: "2024-02-01",
        productExpirationDate: "2026-02-01",
        productShelfAddedDate: "2024-02-25",
        createdDate: "2024-03-14",
        createdBy: "Admin 2",
        modifiedBy: "Editor 1",
        modifiedDate: "2024-04-18",
      },
    ];

    localStorage.setItem("products", JSON.stringify(products));
    return products;
  }

  return existingProducts;
};

// Function to add a new product to localStorage
export const addProduct = (newProduct) => {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Assign a new ID (incremental)
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
};

export const editProduct = (updatedProduct) => {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Find index of the product to update
  const productIndex = products.findIndex(
    (product) => product.id === updatedProduct.id
  );

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    products[productIndex].modifiedBy = "Admin";
    products[productIndex].modifiedDate = new Date()
      .toISOString()
      .split("T")[0];

    localStorage.setItem("products", JSON.stringify(products)); // Save to localStorage
    return true;
  }

  return false;
};

// Function to retrieve products from localStorage
export const getProducts = () => {
  return JSON.parse(localStorage.getItem("products")) || [];
};

export const getProductCount = () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  return products.length;
};

export const getCloseToExpiryProductCount = () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const today = new Date();
  const twoMonthsLater = new Date();
  twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2); // Add 2 months

  return products.filter((product) => {
    const expiryDate = new Date(product.productExpirationDate);
    return expiryDate >= today && expiryDate <= twoMonthsLater;
  }).length;
};

export const deleteProduct = (id) => {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Filter out the product with the given ID
  const updatedProducts = products.filter((product) => product.id !== id);

  // Update local storage
  localStorage.setItem("products", JSON.stringify(updatedProducts));
};

export default generateProducts;
