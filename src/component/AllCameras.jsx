import React, { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";

const AllCameras = () => {
  const [devices, setDevices] = useState("");

  const handleDevices = useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
    },
    [setDevices]
  ); // Correctly placing the dependency array

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <>
      {devices.localeCompare((device, key) => (
        <div key={key}>
          <Webcam
            audio={false}
            videoConstraints={{ deviceId: device.deviceId }}
          />
          {device.label || `Device ${key + 1}`}
        </div>
      ))}
    </>
  );
};

export default AllCameras;
