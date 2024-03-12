import { useState, useEffect } from "react";
import * as Components from "../css/Homepage";
import Classifier from "../components/Classifier";
import LoginRegister from "../components/LoginRegister";
import LoginFirst from "../components/LoginFirst";
import Result from "../components/Result";
import OneResult from "../components/OneResult";

const Homepage = () => {
  const [user, setUser] = useState();
  const [result, setResult] = useState([]);
  const [image, setImage] = useState(null);
  const [uri, setUri] = useState("");

  const [amount, setAmount] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const setvalue = (value) => {
    localStorage.setItem("user", JSON.stringify(value));
    window.location.reload();
  };

  // const collectResult = (value) => {
  //   console.log(value);

  //   let updatedResult = result;
  //   updatedResult = [...updatedResult, value];
  //   console.log(updatedResult);
  //   console.log(result);

  //   setResult([...result, value]);
  // };

  const collectResult = (value) => {
    console.log(value);
    setResult(value);
    console.log(typeof amount);
    const updatedHistory = [...amount, value];
    console.log(updatedHistory);
    setAmount(updatedHistory);
    console.log(amount);
  };

  const collectImage = (value) => {
    console.log(value);
    setImage(value);
  };

  const collectUri = (value) => {
    setUri(value);
  };

  const handleLogout = () => {
    setUser({});
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <Components.Container>
        <Components.Header>
          <Components.Title style={{ color: "#2bff4b", paddingLeft: "115px" }}>
            Currency Detection
          </Components.Title>
          <Components.HeaderElement>
            {/* {user && (
              <button
                type="button"
                class="btn btn-success"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            )} */}
          </Components.HeaderElement>
        </Components.Header>
        <Components.Body>
          <Components.BodyItem>
            {user ? (
              <Classifier
                collectResult={collectResult}
                collectImage={collectImage}
                collectUri={collectUri}
              ></Classifier>
            ) : (
              <LoginFirst></LoginFirst>
            )}
          </Components.BodyItem>
          <Components.BodyItem>
            {user ? (
              // <Result result={result}></Result>
              <OneResult
                result={result}
                image={image}
                uri={uri}
                amount={amount}
              ></OneResult>
            ) : (
              <LoginRegister setUser={setvalue}></LoginRegister>
            )}
          </Components.BodyItem>
        </Components.Body>
      </Components.Container>
    </div>
  );
};

export default Homepage;
