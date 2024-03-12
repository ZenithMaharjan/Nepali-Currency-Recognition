import React, { useEffect, useRef, useState } from "react";
// import ndarrayToBase64 from "ndarray-to-base64";
import Loading from "./Loading";

const Classifier = ({ collectResult, collectImage, collectUri }) => {
  const canvasRef = useRef();
  const imageRef = useRef();
  const videoRef = useRef();

  const [result, setResult] = useState([]);
  const [style, setStyle] = useState("");
  const [uri, setUri] = useState("");

  const [loading, setLoading] = useState(false);

  const [check, setCheck] = useState(0);
  const [image, setImage] = useState();

  const colormatch = {
    fifty: "#65879b",
    five: "#ff6b75",
    fivehundred: "#dcc0a5",
    hundred: "#71867d",
    ten: "#964B00",
    thousand: "#c74758",
    twenty: "#cd5f4c",
    "Error from API": "red",
    "No Currency Detected": "red",
    Fake: "red",
  };

  useEffect(() => {
    async function getCameraStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        // video: true,
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    getCameraStream();
  }, []);

  const captureImageFromCamera = () => {
    const context = canvasRef.current.getContext("2d");
    const { videoWidth, videoHeight } = videoRef.current;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

    canvasRef.current.toBlob((blob) => {
      imageRef.current = blob;
      setImage(blob);
    });
  };

  const playCameraStream = () => {
    if (videoRef.current) {
      videoRef.current.style.width = "75%";
      videoRef.current.style.height = "80%";
      videoRef.current.play();
    }
  };

  // const ndarrayToImage = (ndarrayData) => {
  //   // Convert ndarray data to a canvas
  //   const canvas = document.createElement("canvas");
  //   const context = canvas.getContext("2d");
  //   canvas.width = ndarrayData[0].length;
  //   canvas.height = ndarrayData.length;

  //   // Write pixel data to the canvas
  //   for (let y = 0; y < ndarrayData.length; y++) {
  //     for (let x = 0; x < ndarrayData[y].length; x++) {
  //       const [r, g, b] = ndarrayData[y][x];
  //       context.fillStyle = `rgb(${r},${g},${b})`;
  //       context.fillRect(x, y, 1, 1);
  //     }
  //   }

  //   // Convert the canvas to a base64 encoded image URL
  //   return canvas.toDataURL();
  // };

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     captureImageFromCamera();

  //     if (imageRef.current) {
  //       const formData = new FormData();
  //       formData.append("image", imageRef.current);

  //       const response = await fetch("http://127.0.0.1:8000/api/classifier/", {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });

  //       if (response.status === 200) {
  //         const text = await response.text();
  //         setResult(text);
  //       } else {
  //         setResult("Error from API.");
  //       }
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleClick = async (e) => {
    setResult("...Loading");
    setLoading(true);
    captureImageFromCamera();

    await new Promise((resolve) => setTimeout(resolve, 500));
    if (check != 0) {
      setCheck(0);
    }
    // if (imageRef.current) {
    if (image && check == 0) {
      setCheck(1);
      const formData = new FormData();
      // formData.append("image", imageRef.current);
      formData.append("image", image);
      console.log(imageRef.current);
      const response = await fetch("http://127.0.0.1:8000/api/classifier/", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        console.log("Pass");
        setLoading(false);

        const text = await response.json();
        let text1 = JSON.parse(text["data"])[0][0] || "";
        // let text1 = JSON.parse(text["data"])[1];
        // console.log(text1);
        let imgname = JSON.parse(text["data"])[1];
        collectImage(imgname);
        // console.log(text2);

        // let imageUri = JSON.parse(text["data"])[2];
        setStyle(colormatch[text1]);

        text1 = text1.charAt(0).toUpperCase() + text1.slice(1);
        setResult(text1);
        collectResult(text1);
        // if (fake) {
        //   setFake(false);
        //   setResult("Fake");
        //   setStyle(colormatch["Fake"]);
        //   collectResult("Fake");
        // }

        // setUri(imageUri);
        // collectUri(`data:image/png;base64,${imageUri}`);
        // const imageDataUrl = ndarrayToImage(JSON.parse(text["data"])[1]);
        // const imageDataUrl = JSON.parse(text["data"][1]);
        // const imageDataUrl = await ndarrayToBase64(JSON.parse(text["data"])[1]);
        // console.log(imageDataUrl);
        // collectImage(imageDataUrl);

        // collectImage(imageRef.current);
      } else {
        setLoading(false);

        setStyle(colormatch["Error from API"]);
        setResult("Error from API");
      }
    }
  };

  return (
    <>
      <div>
        <header>
          <h1>Image classifier</h1>
        </header>
        <main>
          <video
            ref={videoRef}
            onCanPlay={() => playCameraStream()}
            id="video"
          />
          <canvas ref={canvasRef} hidden></canvas>

          <p style={{ display: "flex", justifyContent: "center" }}>
            Currently seeing:
            {loading ? (
              <Loading></Loading>
            ) : (
              <span style={{ color: style, marginLeft: "5px" }}>{result}</span>
            )}
          </p>
          <button type="button" class="btn btn-success" onClick={handleClick}>
            Capture
          </button>

          {/* <button
            className={`dual-action-btn ${
              isLeftClick ? "left-click" : "right-click"
            }`}
            onClick={handleClick1}
          >
            Click Me
          </button> */}
        </main>
      </div>
    </>
  );
};

export default Classifier;
