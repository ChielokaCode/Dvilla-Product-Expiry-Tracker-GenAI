import React, { useState } from "react";
import { AddProduct, SideBar } from "../../component/index";
import { Expand } from "@progress/kendo-react-animation";
import AnimateButton from "../../component/AnimateButton";

const EditProductPage = () => {
  const [show, setShow] = useState(true); // Controls Slide animation

  return (
    <div className="flex flex-col md:flex-row flex-1 h-screen">
      <div className="w-full md:w-72">
        <SideBar />
      </div>

      <div className="w-full md:border-l border-gray-300 p-4">
        <AnimateButton
          show={show}
          setShow={setShow}
          Animate={Expand}
          direction="vertical"
          text="Add"
          Component={AddProduct}
        />
      </div>
    </div>
  );
};

export default EditProductPage;
