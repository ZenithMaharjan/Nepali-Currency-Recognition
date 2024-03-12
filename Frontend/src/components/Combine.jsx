import React from "react";
import Login from "./Login";
import Register from "./Register";

const Combine = () => {
  return (
    <div>
      <div>
        <div
          // className="d-flex flex-row justify-content-center "
          // style={{ columnGap: "25px" }}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            // width: "1519px",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Login></Login>
          <Register></Register>
        </div>
      </div>
    </div>
  );
};

export default Combine;
