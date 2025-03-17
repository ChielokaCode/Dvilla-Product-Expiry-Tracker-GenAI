import React from "react";

const AnimateButton = ({
  show,
  setShow,
  Animate,
  direction,
  text,
  Component,
}) => {
  return (
    <>
      {/* Move button to the top-right */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setShow(!show)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          {show ? `Animate Hide ${text}` : `Animate Show ${text}`}
        </button>
      </div>

      {/* Slide Animation */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Animate direction={direction}>
          {show && <Component show={show} setShow={setShow} />}
        </Animate>
      </div>
    </>
  );
};

export default AnimateButton;
