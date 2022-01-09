import React from 'react'
import "./footer.css"


export default function Footer() {
    return (
        <div className="footer">
            <div className="footercontainer">
                <div className="footerbox">
                    <h3>About us</h3>
                    <p>I am just a movie geek wanting to make the cinematic experince of movies easier to access and provide for peoples and theater.</p>
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
                                <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="6.434" height="13.806" viewBox="0 0 6.434 13.806">
                                    <path id="facebook" d="M380.066,21.79V20.6c0-.62.059-.955.947-.955H382.2V17.267h-1.9c-2.287,0-3.091,1.156-3.091,3.091V21.79h-1.424V24.17h1.424v6.9h2.857v-6.9h1.9l.251-2.379Z" transform="translate(-375.786 -17.267)" fill="#fff"/>
                                </svg>

                                    <span>     Facebook</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13.202" height="10.723" viewBox="0 0 13.202 10.723">
                                    <path id="twitter" d="M415.607,20.551a5.431,5.431,0,0,1-1.558.419,2.7,2.7,0,0,0,1.189-1.491,5.327,5.327,0,0,1-1.717.653,2.708,2.708,0,0,0-4.683,1.851,3.052,3.052,0,0,0,.067.62,7.69,7.69,0,0,1-5.579-2.832,2.71,2.71,0,0,0,.838,3.619,2.722,2.722,0,0,1-1.223-.343v.033a2.706,2.706,0,0,0,2.17,2.656,2.862,2.862,0,0,1-.712.092,3.4,3.4,0,0,1-.511-.042,2.71,2.71,0,0,0,2.53,1.876,5.419,5.419,0,0,1-3.359,1.156,5.556,5.556,0,0,1-.653-.034A7.7,7.7,0,0,0,414.258,22.3c0-.117,0-.234-.008-.352A5.819,5.819,0,0,0,415.607,20.551Z" transform="translate(-402.405 -19.277)" fill="#fff"/>
                                </svg>
                                    <span>  Twitter</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12.867" height="12.867" viewBox="0 0 12.867 12.867">
                                    <path id="instagram" d="M472.981,29.078a.508.508,0,0,1-.511.511h-8.955a.508.508,0,0,1-.511-.511V23.65h1.181a3.662,3.662,0,0,0-.168,1.1,4,4,0,0,0,8,0,3.668,3.668,0,0,0-.168-1.1h1.131ZM470.6,24.613a2.586,2.586,0,1,1-2.589-2.5A2.547,2.547,0,0,1,470.6,24.613Zm2.379-3.016a.579.579,0,0,1-.578.578h-1.458a.579.579,0,0,1-.578-.578V20.215a.579.579,0,0,1,.578-.578H472.4a.579.579,0,0,1,.578.578Zm1.457-1.743a1.659,1.659,0,0,0-1.65-1.65h-9.567a1.659,1.659,0,0,0-1.65,1.65v9.567a1.659,1.659,0,0,0,1.65,1.65h9.567a1.659,1.659,0,0,0,1.65-1.65Z" transform="translate(-461.572 -18.205)" fill="#fff"/>
                                </svg>

                                    <span>        Instagram</span>
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
    )
}
