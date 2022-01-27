import React, { useState } from "react";
import axios from "axios";
import "./Signin_theater.css";
import { useHistory } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
function Signin_theater() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();
  const [text, setText] = useState("");

  const [open, setOpen] = useState(false);
  async function submit() {
    try {
      var token = await axios.post("/signin_theater", { email, password });
      localStorage.setItem("token", token.data);
      localStorage.setItem("type", "theater");
      history.push("/");
    } catch (err) {
      setText(err.response.data);
      setOpen(true);
    }
  }
  return (
    <div className="signint">
      <span className="signintTitle">Login For Theater</span>
      <div className="signintForm">
        <label>Email</label>
        <input
          className="signintInput"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          required
        />
        <label>Password</label>
        <input
          className="signintInput"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
        <button className="signintButton" type="submit" onClick={submit}>
          Sign In
        </button>
      </div>
      <br />
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity="error"
          sx={{ width: "400px", fontSize: "20px" }}
        >
          <AlertTitle sx={{ fontSize: "20px" }}> Careful </AlertTitle>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signin_theater;
