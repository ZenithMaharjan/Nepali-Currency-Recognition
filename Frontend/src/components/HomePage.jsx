import { useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [value, setValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res1 = await axios.post("http://127.0.0.1:8000/api/post/", value);
    console.log(res1);
  };

  return (
    <div>
      <p>Enter input</p>
      <input type="text" onChange={(e) => setValue(e.target.value)} />
      <button style={{ backgroundColor: "red" }} onClick={handleSubmit}>
        Get input value
      </button>
    </div>
  );
};

export default HomePage;
