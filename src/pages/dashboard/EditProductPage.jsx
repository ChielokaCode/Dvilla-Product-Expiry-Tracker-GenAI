import React, { useState } from "react";
import { EditProduct, SideBar } from "../../component/index";
import { Slide } from "@progress/kendo-react-animation";
import AnimateButton from "../../component/AnimateButton";

const EditProductPage = () => {
  const [show, setShow] = useState(true); // Controls Slide animation

  return (
    <div className="flex flex-col md:flex-row flex-1 h-screen">
      {/* Sidebar - Isolated from other styles */}
      <div className="w-full md:w-72">
        <SideBar />
      </div>

      <div className="w-full md:border-l border-gray-300 p-4">
        <AnimateButton
          show={show}
          setShow={setShow}
          Animate={Slide}
          direction="left"
          text="Edit"
          Component={EditProduct}
        />
      </div>
    </div>
  );
};

export default EditProductPage;
