import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import "./Signin_user.css";

import { useHistory } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
function Signin_user() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();
  const [text, setText] = useState("");

  const [open, setOpen] = useState(false);
  async function google_submit(response) {
    var emails = response.profileObj.email;
    var passwords = response.profileObj.googleId;

    var username = response.profileObj.name;
    console.log(response.profileObj.googleId);
    var token = await axios.post("/Osignup_user", {
      username,
      email: emails,
      googleId: passwords,
    });
    localStorage.setItem("token", token.data);
    localStorage.setItem("type", "user");
    history.push("/");
  }
  async function submit() {
    try {
      var token = await axios.post("/signin_user", { password, email });
      localStorage.setItem("token", token.data);
      localStorage.setItem("type", "user");
      history.push("/");
    } catch (err) {
      setText(err.response.data);
      setOpen(true);
    }
  }
  return (
    <div className="signinu">
      <span className="signinuTitle">Login For User</span>
      <div className="signinuForm">
        <label>Email</label>
        <input
          className="signinuInput"
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
          className="signinuInput"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />

        <button className="signinuButton" type="submit" onClick={submit}>
          Sign In
        </button>
      </div>
      <br />
      <p>--------------OR--------------</p>
      <GoogleLogin
        clientId="1095483584862-to18ei3hbu77vf6tpd558crcnsjdper7.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(response) => {
          google_submit(response);
        }}
        onFailure={(err) => {
          console.log(err);
        }}
      />

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

export default Signin_user;
