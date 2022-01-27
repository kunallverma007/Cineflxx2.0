import React from "react";
import notfound from "../Assests/notfound.jpg";
function NotFound() {
  return (
    <div
      style={{
        backgroundImage: `url(${notfound})`,
        width: "100%",
        height: "690px",
      }}
    ></div>
  );
}

export default NotFound;
