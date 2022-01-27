import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footercontainer">
        <div className="footerbox">
          <h3>About us</h3>
          <p>
            I am just a movie geek wanting to make the cinematic experince of
            movies easier to access and provide for peoples and theater.
          </p>
        </div>
        <div className="footerbox">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">SignIn</a>
            </li>
            <li>
              <a href="/signup">SignUp</a>
            </li>
          </ul>
        </div>
        <div className="footerbox">
          <h3>Follow Us</h3>
          <div>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/kunal-verma-4154b2194/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.867"
                    height="12.867"
                    viewBox="0 0 50 50"
                  >
                  <path
                    id="linkedin"
                    d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                    // transform="translate(-375.786 -17.267)"
                    fill="#fff"
                  />
                  </svg>

                  <span> Linkedin</span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/kunalve95547319">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.867"
                    height="12.867"
                    viewBox="0 0 13.202 10.723"
                  >
                    <path
                      id="twitter"
                      d="M415.607,20.551a5.431,5.431,0,0,1-1.558.419,2.7,2.7,0,0,0,1.189-1.491,5.327,5.327,0,0,1-1.717.653,2.708,2.708,0,0,0-4.683,1.851,3.052,3.052,0,0,0,.067.62,7.69,7.69,0,0,1-5.579-2.832,2.71,2.71,0,0,0,.838,3.619,2.722,2.722,0,0,1-1.223-.343v.033a2.706,2.706,0,0,0,2.17,2.656,2.862,2.862,0,0,1-.712.092,3.4,3.4,0,0,1-.511-.042,2.71,2.71,0,0,0,2.53,1.876,5.419,5.419,0,0,1-3.359,1.156,5.556,5.556,0,0,1-.653-.034A7.7,7.7,0,0,0,414.258,22.3c0-.117,0-.234-.008-.352A5.819,5.819,0,0,0,415.607,20.551Z"
                      transform="translate(-402.405 -19.277)"
                      fill="#fff"
                    />
                  </svg>
                  <span> Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/verm_kunal/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.867"
                    height="12.867"
                    viewBox="0 0 12.867 12.867"
                  >
                    <path
                      id="instagram"
                      d="M472.981,29.078a.508.508,0,0,1-.511.511h-8.955a.508.508,0,0,1-.511-.511V23.65h1.181a3.662,3.662,0,0,0-.168,1.1,4,4,0,0,0,8,0,3.668,3.668,0,0,0-.168-1.1h1.131ZM470.6,24.613a2.586,2.586,0,1,1-2.589-2.5A2.547,2.547,0,0,1,470.6,24.613Zm2.379-3.016a.579.579,0,0,1-.578.578h-1.458a.579.579,0,0,1-.578-.578V20.215a.579.579,0,0,1,.578-.578H472.4a.579.579,0,0,1,.578.578Zm1.457-1.743a1.659,1.659,0,0,0-1.65-1.65h-9.567a1.659,1.659,0,0,0-1.65,1.65v9.567a1.659,1.659,0,0,0,1.65,1.65h9.567a1.659,1.659,0,0,0,1.65-1.65Z"
                      transform="translate(-461.572 -18.205)"
                      fill="#fff"
                    />
                  </svg>

                  <span> Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footercopyright">
        Copyright © 2021. All rights are reserved.
      </div>
    </div>
  );
}
