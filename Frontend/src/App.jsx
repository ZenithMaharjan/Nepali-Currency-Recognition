import { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";
import HomePage from "./pages/Homepage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AudioRecorder from "./components/AudioRecorder";
import VideoRecorder from "./components/VideoRecorder";
import Record from "./pages/Record";
import Classifier from "./components/Classifier";
import Register from "./components/Register";
import Login from "./components/Login";
import Combine from "./components/Combine";
import Invoice from "./components/Invoice";
import LoginRegister from "./components/LoginRegister";
import Test from "./components/Test";
import DisplayImage from "./components/DisplayImage";
import Testing from "./Test/Testing";
import InvoiceTesting from "./Test/InvoiceTesting";

function App() {
  const [todos, setTodos] = useState("");

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeftAction = () => {
    console.log("Left side clicked");
    // Perform left side action
  };

  const handleRightAction = () => {
    console.log("Right side clicked");
    // Perform right side action
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Audio" element={<AudioRecorder />}></Route>
        <Route path="/Video" element={<VideoRecorder />}></Route>
        <Route path="/Record" element={<Record />}></Route>
        <Route path="/Classifier" element={<Classifier />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Combine" element={<Combine />}></Route>
        <Route path="/LoginRegister" element={<LoginRegister />}></Route>
        <Route path="/Test" element={<Test />}></Route>
        <Route path="/InvoiceTesting" element={<InvoiceTesting />}></Route>
        <Route path="/Invoice" element={<Invoice />}></Route>
        <Route path="/DisplayImage" element={<DisplayImage />}></Route>
        <Route path="/Testing" element={<Testing />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
