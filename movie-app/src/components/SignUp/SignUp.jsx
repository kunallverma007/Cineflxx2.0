import React from "react";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
function SignUp() {
  let history = useHistory();

  return (
    <div className="signuphai">
      <span className="signuphaiTitle">Sign Up</span>
      <div className="signuphaiForm">
        <button
          className="signuphaiInput signupbt1"
         
          onClick={() => {
            history.push("/signup_user");
          }}
        >
          As User
        </button>
        <button
          className="signuphaiInput signupbt2"

          onClick={() => {
            history.push("/signup_theater");
          }}
        >
          As Theater
        </button>
      </div>
    </div>
  );
}

export default SignUp;