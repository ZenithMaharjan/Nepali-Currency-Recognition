import React from "react";
import * as Components from "../css/Homepage";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

const LoginFirst = () => {
  return (
    <Components.LockedScreen>
      <div>
        <Components.LockedTitle>
          Please Login or Register First!!!
        </Components.LockedTitle>
      </div>
      <Components.LockedPhoto>
        <NoPhotographyIcon
          style={{ width: "500px", height: "500px" }}
        ></NoPhotographyIcon>
      </Components.LockedPhoto>
    </Components.LockedScreen>
  );
};

export default LoginFirst;
