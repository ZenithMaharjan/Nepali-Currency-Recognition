import { useState } from "react";
import * as Components from "../css/StyledComponents";
import axios from "axios";
import Error from "./Error";

const Test = ({ setUser }) => {
  const [signIn, toggle] = useState(true);

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");

  const [usernamelog, setUsernamelog] = useState("");
  const [passwordlog, setPasswordlog] = useState("");

  const [checklog, setChecklog] = useState(true);
  const [checkreg, setCheckreg] = useState(true);

  const reguser = {
    fName,
    lName,
    username,
    email,
    password,
    phoneNo,
  };

  const loguser = {
    username: usernamelog,
    password: passwordlog,
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log(reguser);

    if (
      fName.length < 1 ||
      lName.length < 1 ||
      username.length < 8 ||
      password.length < 8 ||
      !phoneNo.startsWith(98) ||
      phoneNo.length != 10
    ) {
      setCheckreg(false);
    }

    try {
      const res = (
        await axios.post("http://127.0.0.1:8000/api/register/", reguser)
      ).data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(loguser);
    try {
      const res = (
        await axios.post("http://127.0.0.1:8000/api/login/", loguser)
      ).data;

      if (res == `Password Don't Match`) {
        setChecklog(false);
      } else if (res == `Login Failed`) {
        setChecklog(false);
      } else {
        setChecklog(true);
        console.log("Login Successful");
        setUser(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={handleRegister}>
          <Components.RegTitle>Create Account</Components.RegTitle>
          {!checkreg && (
            <div>
              <div
                className="text-danger"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Registration Failed!!!
              </div>
            </div>
          )}
          <Components.RegInput
            type="text"
            placeholder="First Name"
            onChange={(event) => setFname(event.target.value)}
          />
          {!checkreg && fName.length < 1 && (
            <Error message="Invalid Firstname" style={{ fontSize: "12px" }} />
          )}
          <Components.RegInput
            type="text"
            placeholder="Last Name"
            onChange={(event) => setLname(event.target.value)}
          />
          {!checkreg && lName.length < 1 && (
            <Error message="Invalid Lastname" style={{ fontSize: "12px" }} />
          )}
          <Components.RegInput
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          {!checkreg && username.length < 8 && (
            <Error
              message="Username should be 8-20 letters!"
              style={{ fontSize: "12px" }}
            />
          )}
          <Components.RegInput
            type="email"
            attern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <Components.RegInput
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {!checkreg && password.length < 8 && (
            <Error
              message="Password should be atleast 8 letters!"
              style={{ fontSize: "12px" }}
            />
          )}
          <Components.RegInput
            type="text"
            placeholder="Phone No"
            onChange={(event) => setPhone(event.target.value)}
          />
          {!checkreg && (!phoneNo.startsWith(98) || phoneNo.length != 10) && (
            <Error
              message="Invalid Phone Number"
              style={{ fontSize: "12px" }}
            />
          )}
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Sign in</Components.Title>
          {!checklog && (
            <div>
              <div className="text-danger" style={{ fontWeight: "bold" }}>
                Login Failed!!!
              </div>
            </div>
          )}
          <Components.Input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsernamelog(event.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            onChange={(event) => setPasswordlog(event.target.value)}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default Test;
