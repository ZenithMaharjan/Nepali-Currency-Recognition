import React, { useState, useEffect } from "react";
import * as Components from "../css/Homepage";

const Result = ({ result }) => {
  const [history, setHistory] = useState(["Apple", "Orange"]);
  console.log(result);

  useEffect(() => {
    console.log("Entered");
    // const handleClick = () => {
    //   setHistory(result);
    // };

    const handleClick = () => {
      const updatedHistory = [...history, result];
      setHistory(updatedHistory);
      console.log(history);
    };

    handleClick();
  }, [result]);

  const handleClick = () => {
    const updatedHistory = [...history, result];
    setHistory(updatedHistory);
    console.log(history);
  };

  // useEffect(() => {
  //   const Search = (data) => {
  //     return data;
  //   };
  //   Search();
  // }, [toggle]);

  // const listItems = history.map((item, index) => console.log(""));
  return (
    <Components.DetailScreen>
      <Components.WelcomeText>Welcome User!!!</Components.WelcomeText>
      {/* <button onClick={handleClick}>Click</button> */}
      <Components.DetailContainer>
        {Object.values(history).map((item) => (
          <div>
            <h1>{item}</h1>
          </div>
        ))}
      </Components.DetailContainer>
    </Components.DetailScreen>
  );
};

export default Result;
