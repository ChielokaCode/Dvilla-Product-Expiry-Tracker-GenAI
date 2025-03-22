import React, { useState } from "react";
import { AddProduct, SideBar } from "../../component/index";
import { Expand } from "@progress/kendo-react-animation";
import AnimateButton from "../../component/AnimateButton";

const EditProductPage = () => {
  const [show, setShow] = useState(true); // Controls Slide animation

  return (
    <div className="flex flex-col">
      {/* Sidebar - Isolated from other styles */}
      <div>
        <SideBar />
      </div>

      {/* Main Content Area */}

      <AnimateButton
        show={show}
        setShow={setShow}
        Animate={Expand}
        direction="vertical"
        text="Add"
        Component={AddProduct}
      />
    </div>
  );
};

export default EditProductPage;
