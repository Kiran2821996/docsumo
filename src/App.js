import React, { useState } from "react";
import msgImage from "./assets/msg_icon.png";
import docLogo from "./assets/docsumo-logo.png";

import UserName from "./components/UserName";
import Form from "./components/Form";

import "./App.css";

function App() {
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState("");

  return (
    <>
      <div className="App">
        <div className="doclogo">
          <img src={docLogo} alt="logo" width={250} />
        </div>
        {!success ? (
          <Form setSuccess={setSuccess} setUser={setUser} />
        ) : (
          <UserName user={user} />
        )}

        <div className="msg_logo">
          <img src={msgImage} alt="msg" />
        </div>
      </div>
    </>
  );
}

export default App;
