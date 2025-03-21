import React, { useState } from "react";
import { EditProduct, SideBar } from "../../component/index";
import { Slide } from "@progress/kendo-react-animation";
import AnimateButton from "../../component/AnimateButton";

const EditProductPage = () => {
  const [show, setShow] = useState(true); // Controls Slide animation

  return (
    <div className="flex">
      {/* Sidebar - Isolated from other styles */}
      <div className="w-64 min-h-screen bg-gray-100 shadow-md">
        <SideBar />
      </div>

      {/* Main Content Area */}
      <AnimateButton
        show={show}
        setShow={setShow}
        Animate={Slide}
        direction="left"
        text="Edit"
        Component={EditProduct}
      />
    </div>
  );
};

export default EditProductPage;
