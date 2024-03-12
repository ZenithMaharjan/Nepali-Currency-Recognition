import { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "../css/Registration.css";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    username,
    password,
  };

  const handleLogin = () => {
    console.log(user);
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-flex-start "
      style={{
        backgroundColor: "red",
        width: "100%",
        height: "100%",
        padding: "0",
        margin: "0",
        justifyContent: "flex-end",
      }}
    >
      <div
        className="mask gradient-custom-3"
        style={{ padding: "0", display: "flex" }}
      ></div>
      {/* <form action="/register" method="post" onSubmit={handleRegister}> */}
      <form onSubmit={handleLogin} style={{ margin: 0, padding: 0 }}>
        <MDBCard style={{ width: "550px", maxWidth: "900px", margin: "0" }}>
          <MDBCardBody className="px-3" style={{ width: "500px" }}>
            <h2 className="text-uppercase text-center mb-5">
              Create an account
            </h2>
            <MDBInput
              wrapperClass="mb-4"
              // label="Username"
              placeholder="Username"
              size="lg"
              id="form2"
              type="text"
              onChange={(event) => setusername(event.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              // label="Password"
              placeholder="Password"
              size="lg"
              id="form3"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="submit"
              className="mb-4 w-100 gradient-custom-4"
              style={{ borderRadius: "25px" }}
            >
              Sign In
            </button>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
};

export default Login;
