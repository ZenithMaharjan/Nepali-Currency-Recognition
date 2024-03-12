import React, { useState, useEffect } from "react";
import * as Components from "../css/Homepage";
import DisplayImage from "./DisplayImage";
import { Stack } from "./DisplayImage";
import EnterInput from "./EnterInput";

const OneResult = ({ result, image, uri, amount }) => {
  let currentDate = new Date();

  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [history, setHistory] = useState([]);
  const [displayimage, setdisplayimage] = useState();

  const [displayResult, setDisplayResult] = useState([]);

  const [account, setAccount] = useState();
  const [style, setStyle] = useState("");

  const [currentUser, setcurrentUser] = useState();

  const [contain, setContain] = useState(false);

  const [current, setCurrent] = useState({
    countNCD: 0,
    countF: 0,
    total: 0,
  });

  const [result1, setResult1] = useState([]);
  const [userinput, setUserinput] = useState(false);

  console.log(history.length);
  console.log(history);

  console.log(user);
  console.log(amount);

  const colormatch = {
    fifty: 50,
    five: 5,
    fivehundred: 500,
    hundred: 100,
    ten: 10,
    thousand: 1000,
    twenty: 20,
    "Error from API": "red",
    "No Currency Detected": "red",
  };

  const color = {
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
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setUser(foundUser.fName);
      setUsername(foundUser.username);
    }

    let currentuser = localStorage.getItem("currentuser");
    if (currentuser) {
      currentuser = JSON.parse(currentuser);
      console.log(currentuser);
      setcurrentUser(currentuser);
    }
    // const currentUser = localStorage.getItem("currentUser");
    // const currentlogUser = JSON.parse(currentUser);
    // setcurrentUser(currentlogUser);
  }, [userinput]);

  useEffect(() => {
    console.log(amount);
    let countNCD = 0;
    let countF = 0;
    let total = 0;
    Object.values(amount).forEach((item) => {
      if (item === "No Currency Detected") {
        countNCD++;
      } else if (item === "Fake") {
        countF++;
      } else {
        console.log(colormatch[item]);
        total = total + colormatch[item];
      }
      console.log(countNCD, countF, total);

      const newObj = {
        countNCD: countNCD,
        countF: countF,
        total: total,
      };

      setCurrent(newObj); // Add new object to the array
    });

    // const userInvoice = localStorage.getItem("invoice");
    // const foundInvoice = JSON.parse(userInvoice);
    // console.log(typeof foundInvoice);
    // console.log(foundInvoice);
    // localStorage.setItem("invoice", JSON.stringify(amount));
  }, [amount]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log(current);

    const jsonString = JSON.stringify(current);
    localStorage.setItem("current", jsonString);

    const storedJsonString = localStorage.getItem("invoice");

    let myArray = [];

    if (storedJsonString) {
      myArray = JSON.parse(storedJsonString);
    }

    const newObj = {
      ac: currentUser[0].ac,
      name: currentUser[0].name,
      total: current.total,
      date: currentDate.toLocaleDateString(),
    };
    // const newObj = { name: currentUser.name, total: current.total };

    myArray[0].forEach((data, index) => {
      if (data.name == currentUser[0].name) {
        currentUser[0].date = currentDate.toLocaleDateString();
        currentUser[0].total = currentUser[0].total + current.total;
        myArray[0][index] = currentUser[0];
        setContain(true);
      }
    });

    // console.log("Before");
    // console.log(myArray[0]);
    if (!contain) {
      myArray[0].push(newObj);
    }

    // console.log("After");
    // console.log(myArray[0]);

    const updatedJsonString = JSON.stringify(myArray);
    localStorage.setItem("invoice", updatedJsonString);
    setContain(false);

    window.location.href = "http://localhost:5173/Invoice";
  };

  useEffect(() => {
    console.log("Entered");
    // const handleClick = () => {
    //   setHistory(result);
    // };

    const handleClick = () => {
      const updatedHistory = [...history, image];
      const updatedResult = [...displayResult, result];

      setHistory(updatedHistory);
      setDisplayResult(updatedResult);
      console.log(history);
      console.log(result);
    };

    handleClick();
  }, [image]);

  const showImage = (value) => {
    console.log(value);
    setdisplayimage(value);
    console.log(displayimage);
  };

  const handleUserInput = (value) => {
    setUserinput(value);

    localStorage.setItem("userinvolved", JSON.stringify(true));
  };
  return (
    <div>
      <Components.DetailScreen>
        {userinput ? (
          <>
            {user ? (
              <Components.WelcomeTextContainer>
                {amount[0] && (
                  <button
                    type="button"
                    class="btn btn-success"
                    style={{
                      marginTop: "2px",
                      marginBottom: "10px",
                      fontSize: "30px",
                    }}
                    onClick={handleUpdate}
                  >
                    Post
                  </button>
                )}
                <Components.WelcomeText>
                  {currentUser[0].name} {!amount[0] && `[${currentUser[0].ac}]`}
                </Components.WelcomeText>
              </Components.WelcomeTextContainer>
            ) : (
              <>
                <p>Loadi</p>
              </>
            )}
            {/* <Components.DetailContainer>
          {image && (
            <div>
              <img
                // src={URL.createObjectURL(image)}
                // src={uri}
                src={image}
                // src={`data:image/png;base64,${uri}`}
                // src={`data:image/png;base64,${image}`}
                alt="Selected Image"
                style={{
                  display: "inline-block",
                  width: "auto",
                  height: "450px",
                  objectFit: "contain",
                  paddingTop: "20px",
                }}
              />
            </div>
          )}
          <h1>{result}</h1>
        </Components.DetailContainer> */}

            <Components.DetailContainer>
              <div className="main" style={{ paddingLeft: "0px" }}>
                {/* {history.length != 0 &&
              history.length != 1 &&
              Object.values(history)
                .slice(1)
                .map((item) => (
                  // <div>
                  //   <h1>{item}</h1>
                  // </div>
                  <Stack
                    image={item}
                    background="#52649e"
                    showImage={showImage}
                  />
                ))} */}

                {history.length != 0 &&
                  history.length != 1 &&
                  Object.values(history)
                    .slice(1)
                    .reverse()
                    .map((item, index) => (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Stack
                            image={item}
                            background="#52649e"
                            showImage={showImage}
                          />
                          <div
                            style={{ color: color[displayResult[index + 1]] }}
                          >
                            {displayResult[displayResult.length - index - 1]}
                          </div>
                        </div>
                      </>
                    ))}
              </div>
            </Components.DetailContainer>
          </>
        ) : (
          <>
            {/* <p>Enter User</p> */}
            <EnterInput handleUserInput={handleUserInput}></EnterInput>
          </>
        )}
      </Components.DetailScreen>
    </div>
  );
};

export default OneResult;
