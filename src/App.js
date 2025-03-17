import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NoPage from "./pages/[404]";
import AddProductPage from "./pages/dashboard/AddProductPage";
import EditProductPage from "./pages/dashboard/EditProductPage";
import ShowProductPage from "./pages/dashboard/ShowProductPage";
import ShowCloseToExpiryProductsPage from "./pages/dashboard/ShowCloseToExpiryProductsPage";
import ChatbotPage from "./pages/ChatbotPage";
import ProfilePage from "./pages/ProfilePage";
import WebcamCapturePage from "./pages/WebcamCapturePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/404" element={<NoPage />} />
          <Route exact path="/chatbot" element={<ChatbotPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route
            exact
            path="/dashboard/scanProduct"
            element={<WebcamCapturePage />}
          />
          <Route
            exact
            path="/dashboard/addProduct"
            element={<AddProductPage />}
          />
          <Route exact path="/dashboard/" element={<AddProductPage />} />
          <Route
            exact
            path="/dashboard/editProduct/:id"
            element={<EditProductPage />}
          />
          <Route
            exact
            path="/dashboard/showProduct"
            element={<ShowProductPage />}
          />
          <Route
            exact
            path="/dashboard/closeToExpiry"
            element={<ShowCloseToExpiryProductsPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
