import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IsAuth } from "../Auth/Auth";

import Loader from "../Loader/Loader";
const Profile_user = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  let history = useHistory();
  async function get() {
    const { auth, type, user } = await IsAuth();
    if (type === "theater" || auth === false) {
      history.push("/login");
    }

    var x = await axios.post("/user", { _id: user });
    console.log(x);
    setUser(x.data);
    console.log(user);
  }
  useEffect(() => {
    get();
  }, []);

  return user.username === "" ? (
    <Loader />
  ) : (
    <div style={{ textAlign: "center", paddingTop: "40px" }}>
      <h1> Name : {user.username} </h1>

      <h2> Email : {user.email} </h2>
    </div>
  );
};

export default Profile_user;
