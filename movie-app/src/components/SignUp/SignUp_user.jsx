import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";

import "./SignUp_user.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function SignUp_user() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  async function google_submit(response) {
    console.log("ok");
    var email = response.profileObj.email;
    var username = response.profileObj.name;
    var googleId = response.profileObj.googleId;
    var token = await axios.post("/Osignup_user", {
      username,
      email,
      googleId,
    });
    localStorage.setItem("token", token.data);
    localStorage.setItem("type", "user");
    history.push("/");
  }
  async function submit() {
    console.log("trying to submit");

    try {
      await axios.post("/signup_user", {
        username,
        password,
        email,
      });

      history.push("/login_user");
    } catch (err) {
      setText(err.response.data);
      setOpen(true);
    }
  }
  return (
    <div className="signupu">
      <span className="signupuTitle">Register For User</span>
      <div className="signupuForm">
        <label>User Name</label>
        <input
          className="signupuInput"
          type="text"
          placeholder="Username"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
          required
        />
        <label>Password</label>
        <input
          className="signupuInput"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
        <label>Email</label>
        <input
          className="signupuInput"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          required
        />
        <button className="signupuButton" type="submit" onClick={submit}>
          Sign Up
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
      </Snackbar>{" "}
    </div>
  );
}

export default SignUp_user;
