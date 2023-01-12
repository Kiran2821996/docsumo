import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Form({ setSuccess, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [validateError, setValidateError] = useState({});
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(true);
  let recievedData;

  //handle password visibility
  const visiblity = () => {
    setPasswordShown(!passwordShown);
  };

  //form validation
  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Please enter a valid email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Please enter a password";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    return newErrors;
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const newErrors = validate();
    if (
      newErrors &&
      (newErrors.email.length > 0 || newErrors.password.length > 0)
    ) {
      setToggle(true);
      setValidateError(newErrors);
    } else {
      try {
        setToggle(false);
        setValidateError({
          email: "",
          password: "",
        });
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
        setError(error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        validateError.email && validateError.password ? "form1" : "form"
      }
      id={validateError.email || validateError.password ? "form1" : "form"}
    >
      <h3>Login to your Docsumo account</h3>
      {error ? (
        <p className="apiError">{error}</p>
      ) : (
        <div className="none"></div>
      )}
      <label htmlFor="email">
        <p className="label">Work Email</p>
        <input
          type="email"
          name="email"
          className={validateError.email ? "emailValidate" : "emailInput"}
          placeholder="johndoe@abc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {validateError.email && (
          <p className="validError">{validateError.email}</p>
        )}
      </label>
      <br />

      <label htmlFor="password">
        <p className="label">Password</p>
        <input
          type={passwordShown ? "text" : "password"}
          name="password"
          placeholder="Enter password here..."
          className={
            validateError.password ? "passwordValidate" : "passwordInput"
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordShown ? (
          <VisibilityOutlinedIcon
            id={
              (validateError.email && validateError.password && "eye1") ||
              (validateError.email && "eye2") ||
              (validateError.password && "eye3") ||
              (!validateError.email && !validateError.password && "eye")
            }
            onClick={visiblity}
          />
        ) : (
          <VisibilityOffOutlinedIcon
            id={
              (validateError.email && validateError.password && "eye1") ||
              (validateError.email && "eye2") ||
              (validateError.password && "eye3") ||
              (!validateError.email && !validateError.password && "eye")
            }
            onClick={visiblity}
          />
        )}

        {validateError.password && (
          <p className="validError">{validateError.password}</p>
        )}
      </label>
      <div className="forPass">
        <p>Forgot Password?</p>
      </div>
      {toggle ? (
        <button type="submit" className="signUp">
          Login
        </button>
      ) : (
        <button type="submit" className="signUpLogging">
          <>
            <LoadingOutlined /> Logging in...
          </>
        </button>
      )}

      <h2 className="sigUp">
        Don't have an account? <span className="sigUpCol"> Sign Up</span>
      </h2>
    </form>
  );
}

export default Form;
