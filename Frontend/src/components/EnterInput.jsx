import { useState, useEffect } from "react";
import * as Components from "../css/StyledComponents";
import axios from "axios";
import Error from "./Error";
import "../css/Suggestion.css";

const EnterInput = ({ handleUserInput }) => {
  const [signIn, toggle] = useState(true);

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");

  const [account, setAccount] = useState("");
  const [name, setName] = useState("");

  const [randac, setRandac] = useState(generateRandomNumber());

  const [usernamelog, setUsernamelog] = useState("");
  const [passwordlog, setPasswordlog] = useState("");

  const [checklog, setChecklog] = useState(true);
  const [checkreg, setCheckreg] = useState(true);

  const [invoice, setInvoice] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  console.log(invoice);
  const reguser = {
    ac: randac,
    name: lName,
    address: username,
    email: email,
    phoneNo,
  };

  const loguser = {
    username: usernamelog,
    password: passwordlog,
  };

  useEffect(() => {
    const totalInvoice = localStorage.getItem("invoice");
    const foundTotal = JSON.parse(totalInvoice);
    setInvoice(foundTotal);
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log(reguser);

    if (
      lName.length < 1 ||
      username.length > 25 ||
      username.length < 3 ||
      !phoneNo.startsWith(98) ||
      phoneNo.length != 10 ||
      !emailRegex.test(email)
    ) {
      setCheckreg(false);
    } else {
      let myArray = [];

      myArray.push(reguser);
      const updatedJsonString = JSON.stringify(myArray);
      localStorage.setItem("currentuser", updatedJsonString);

      setName(reguser.name);
      setAccount(reguser.ac);
      handleUserInput(true);
    }
    // try {
    //   const res = (
    //     await axios.post("http://127.0.0.1:8000/api/register/", reguser)
    //   ).data;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    setRandac(generateRandomNumber());
  }, [signIn]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100000000); // 100,000,000 is the maximum 8-digit number
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    if (name != "") {
      handleUserInput(true);
    } else {
      setChecklog(false);
    }
  };

  const handleUserEnter = (e) => {
    const value = e.target.value;
    setName(value);
    function findObjectByKeyValue(key, value) {
      return invoice[0].find((item) => item[key] === value);
    }

    const obj = findObjectByKeyValue("name", value);
    if (obj) {
      console.log(obj);

      setAccount(obj.ac);
    }
  };

  const onSearch = (searchTerm) => {
    let myArray = [];

    myArray.push(searchTerm);
    const updatedJsonString = JSON.stringify(myArray);
    localStorage.setItem("currentuser", updatedJsonString);

    setName(searchTerm.name);
    setAccount(searchTerm.ac);
  };
  // useEffect(() => {
  //   const handleSearch = (e) => {
  //     const term = e.target.value;

  //     const filteredObjects =
  //       term === ""
  //         ? invoice[0] // Show all objects if search term is empty
  //         : invoice[0].filter((obj) =>
  //             obj.name.toLowerCase().includes(term.toLowerCase())
  //           );

  //     setSearchResults(filteredObjects);
  //   };
  //   handleSearch();
  // }, [name]);

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
            placeholder="Account"
            onChange={(event) => setFname(event.target.value)}
            value={`Ac No - ${randac}`}
            readOnly
          />

          <Components.RegInput
            type="text"
            placeholder="Name"
            onChange={(event) => setLname(event.target.value)}
          />
          {!checkreg && lName.length < 1 && (
            <Error message="Invalid Name" style={{ fontSize: "12px" }} />
          )}
          <Components.RegInput
            type="text"
            placeholder="Address"
            onChange={(event) => setUsername(event.target.value)}
          />
          {!checkreg && username.length < 3 && username.length > 25 && (
            <Error message="Invalid Address!" style={{ fontSize: "12px" }} />
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
          <Components.RegInput
            type="email"
            attern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />

          {!checkreg && !emailRegex.test(email) && (
            <Error message="Invalid Email" style={{ fontSize: "12px" }} />
          )}
          {/* <Components.RegInput
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {!checkreg && password.length < 8 && (
            <Error
              message="Password should be atleast 8 letters!"
              style={{ fontSize: "12px" }}
            />
          )} */}

          <Components.Button>Register User</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Enter User</Components.Title>
          {!checklog && (
            <div>
              <div className="text-danger" style={{ fontWeight: "bold" }}>
                Login Failed!!!
              </div>
            </div>
          )}
          <Components.Input
            type="Name"
            placeholder="Name"
            value={name}
            onChange={handleUserEnter}
          />
          <div style={{ display: "absolute" }}>
            <div className="dropdown">
              {invoice &&
                invoice[0]
                  .filter((item) => {
                    const searchTerm = name.toLowerCase();
                    const actual_name = item.name.toLowerCase();
                    return (
                      searchTerm &&
                      actual_name.startsWith(searchTerm) &&
                      actual_name !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((item) => (
                    <div
                      onClick={() => onSearch(item)}
                      className="dropdown-row"
                    >
                      {item.name} [{item.ac}]
                    </div>
                  ))}
            </div>
          </div>
          <Components.Input
            type="text"
            placeholder="Account No."
            value={account}
            readOnly
            onChange={(event) => setAccount(event.target.value)}
          />
          <Components.Button>Enter User</Components.Button>
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
              Enter User
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Register User
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default EnterInput;
