import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav,Container } from "react-bootstrap";
import NotificationsIcon from "@material-ui/icons/Notifications";

import "../Movies/new.css"
import {useHistory} from 'react-router-dom';

export default function CustomNavbar(props) {
  const history = useHistory();
 
  function signout(){
      localStorage.removeItem("type");
      localStorage.removeItem("token");

      window.location.reload()
  }
 
  const [_id,set_id]=useState("")
  const [name,setName]=useState("")
  useEffect(()=>{
    set_id(props._id)
    setName(props.name)
  },[props])
  const Condition = () => {
    if (_id === "") {
      return (
        <>
          <Nav.Link
            style={{ color: "black", fontWeight: "bold"}}
            href="/login"
          >
            Login
          </Nav.Link>
          <Nav.Link
            style={{ color: "black", fontWeight: "bold" }}
            eventKey={2}
            href="/signup"
          >
            SignUp
          </Nav.Link>
        </>
      );
    } else {
        
      return (
        <>
          <Nav.Link 
              style={{ color: "black", fontWeight: "bold",fontSize:"1.8rm" }}                
              onClick={()=>localStorage.getItem("type")==="user"?history.push(`/user`):history.push(`/theaters`)}      
          >
            {name}
          </Nav.Link>
          <Nav.Link style={{ color: "black", fontWeight: "bold" }} onClick={signout}>
           SignOut
          </Nav.Link>
        </>
      );
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark">
    <Container >
    <Navbar.Brand
      href="/"
      style={{
        color: "black",
        fontFamily: "Lato, sans-serif",
        fontWeight: "bolder",
        fontSize: "1.5rem",
      }}
    >

      Cineflex 
    </Navbar.Brand>
    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
    {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
      <Nav className="me-auto" style={{ width:"400px",paddingTop:"20px",paddingBottom:"10px"}}>
      <Nav.Link
          style={{ color: "black", fontWeight: "bold" }}
          href="#trending"
        >
          Trending
        </Nav.Link>
      
        <Nav.Link
          style={{ color: "black", fontWeight: "bold" }}
          href="#upcoming"
        >
          Latest
        </Nav.Link>
       
        <Nav.Link
          style={{ color: "black", fontWeight: "bold" }}
          href="/booking"
        >
          My Bookings
        </Nav.Link>
      </Nav>
      <Nav className="me-auto" style={{marginLeft:"70%"}}>
        <Nav.Link
          style={{ color: "black", fontWeight: "bold" }}
          href="/search/avenger"
        >
          <NotificationsIcon></NotificationsIcon>
        </Nav.Link>
        <Condition />
      </Nav>
    </Container>
  </Navbar>
  );
}
