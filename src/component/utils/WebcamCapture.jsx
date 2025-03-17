import { Button } from "@progress/kendo-react-buttons";
import React, { useState } from "react";
import Webcam from "react-webcam";
import WebCapturebot from "../WebCapturebot";

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [imgSrc, setImgSrc] = React.useState("");

  const capture = React.useCallback(() => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setIsCaptured(true);
      console.log(imageSrc);
    } catch (e) {
      setIsCaptured(false);
    }
  }, [webcamRef, setImgSrc]);

  const videoConstraints = {
    facingMode: "user",
  };

  return (
    <div id="webcapture">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 lg:px-8">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="border-1 rounded-lg shadow-lg"
          mirrored={true}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
          }}
        />
        <Button themeColor={"primary"} size={"large"} onClick={capture}>
          Capture photo
        </Button>
        {/* Camera Image base64 imgSrc  */}
        {isCaptured ? (
          <div className="mt-4 p-3 bg-gray-100 border rounded w-auto overflow-hidden break-words">
            <strong>Picture: </strong>
            <img src={imgSrc} alt="captured" />
          </div>
        ) : (
          ""
        )}
        {/* Pass the captured image (base64) to ChatBot */}
        <WebCapturebot base64={imgSrc} />
      </div>
    </div>
  );
};

export default WebcamCapture;
