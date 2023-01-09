import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined,LoadingOutlined } from "@ant-design/icons";

function Form({ setSuccess, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(true);
  let recievedData;

  //handle password visibility
  const visiblity = () => {
    setPasswordShown(!passwordShown);
  };

  //handle form submit
  const handleSubmit = async (e) => {
    setToggle(false);
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        "https://apptesting.docsumo.com/api/v1/eevee/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      recievedData = await response.json();
      if (recievedData.status_code === 200) {
        setToggle(true);
        setSuccess(true);
        setUser(recievedData.data.user.full_name);
      } else {
        setToggle(true);
        setSuccess(false);
        setError(recievedData.error);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login to your Docsumo account</h2>
      {error && <p>{error}</p>}
      <label htmlFor="email">
        <span>Work Email</span>
        <input
          type="email"
          name="email"
          placeholder="johndoe@abc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />

      <label htmlFor="password">
        <span>Password</span>
        <input
          type={passwordShown ? "text" : "password"}
          name="password"
          placeholder="Enter password here..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordShown ? (
            <EyeOutlined className="eye" onClick={visiblity} />
         
        ) : (
            <EyeInvisibleOutlined className="eye" onClick={visiblity}  />
        )}
      </label>
      <div className="for_pass">
        <span>Forgot Password?</span>
      </div>
      <button type="submit" className="sign_up">
        {toggle ? "Login" : <><LoadingOutlined /> Logging in...</> }
      </button>
      <h2 className="sig-up">
        Don't have an account? <span className="sig-up-col"> Sign Up</span>
      </h2>
    </form>
  );
}

export default Form;
