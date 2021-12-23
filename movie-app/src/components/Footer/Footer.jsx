import React from 'react'
import "./footer.css"


export default function Footer() {
    return (
        <div className="footer">
            <div className="footercontainer">
                <div className="footerbox">
                    <h3>About us</h3>
                    <p>It was started in the 2001 with Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Culpa, laboriosam.</p>
                </div>
                <div className="footerbox">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">SignIn</a>
                        </li>
                        <li>
                            <a href="#">SignUp</a>
                        </li>
                    </ul>
                </div>
                <div className="footerbox">
                    <h3>Follow Us</h3>
                    <div>
                        <ul>
                            <li>
                                <a href="#">
                                    <img src="../Assests/facebook.svg" alt="" />
                                    <span>Facebook</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../Assests/twitter.svg" alt="" />
                                    <span>Twitter</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../Assests/instagram.svg" alt="" />
                                    <span>Instagram</span>
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
