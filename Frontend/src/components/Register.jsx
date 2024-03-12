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

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const user = {
    fname,
    lname,
    username,
    email,
    password,
    cpassword,
    agree,
  };

  const handleRegister = (event) => {
    event.preventDefault();
    console.log(user);
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-flex-start justify-content-flex-start bg-image"
      style={{
        backgroundColor: "blue",
        width: "100%",
        height: "100%",
        padding: "0",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      {/* <form action="/register" method="post" onSubmit={handleRegister}> */}
      <form onSubmit={handleRegister} style={{ margin: 0, padding: 0 }}>
        <MDBCard style={{ width: "550px", maxWidth: "900px", height: "100%" }}>
          <MDBCardBody className="px-3" style={{ width: "500px" }}>
            <h2 className="text-uppercase text-center mb-5">
              Create an account
            </h2>
            <div
              className="d-flex flex-row justify-content-center "
              style={{ columnGap: "25px" }}
            >
              <MDBInput
                wrapperClass="mb-4"
                // label="Your Name"
                placeholder="First Name"
                size="lg"
                id="form1"
                type="text"
                onChange={(event) => setFname(event.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                // label="Your Name"
                placeholder="Last Name"
                size="lg"
                id="form1"
                type="text"
                onChange={(event) => setLname(event.target.value)}
              />
            </div>
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
              // label="Your Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              placeholder="Enter Email"
              name="email"
              size="lg"
              id="email"
              required
              onChange={(event) => setEmail(event.target.value)}
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
            <MDBInput
              wrapperClass="mb-4"
              // label="Repeat your password"
              placeholder="Repeat your password"
              size="lg"
              id="form4"
              type="password"
              onChange={(event) => setCpassword(event.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              // label="Phone No"
              placeholder="Phone No"
              size="lg"
              id="form2"
              type="text"
              pattern="^9[0-9]*"
              value={phone}
              onChange={(e) =>
                setPhone((v) => (e.target.validity.valid ? e.target.value : v))
              }
            />
            <div className="d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I agree all statements in Terms of service"
              />
            </div>
            <button
              type="submit"
              className="mb-4 w-100 gradient-custom-4"
              style={{ borderRadius: "25px" }}
            >
              Register
            </button>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default Register;
