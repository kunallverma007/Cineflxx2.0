import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown,Container } from "react-bootstrap";
import NotificationsIcon from "@material-ui/icons/Notifications";

import "../Movies/new.css"
import {useHistory} from 'react-router-dom';

export default function CustomNavbar(props) {
  const history = useHistory();
  console.log(props)
  function signout(){
      localStorage.removeItem("type");
      localStorage.removeItem("token");
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
              onClick={()=>history.push(`/user`)}      
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
      KHIDKI
    </Navbar.Brand>
    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
    {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
      <Nav className="me-auto" style={{ width:"100px"}}>
        <NavDropdown title="Movies" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/movie/1">Popular</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Now Playing</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Upcoming</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">Top Rated</NavDropdown.Item>
        </NavDropdown>
      
        <NavDropdown title="TVShows" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/show/1">Popular</NavDropdown.Item>
          <NavDropdown.Item href="#action/4.2">Now Playing</NavDropdown.Item>
          <NavDropdown.Item href="#action/4.3">ON TV</NavDropdown.Item>
          <NavDropdown.Item href="#action/4.4">Top Rated</NavDropdown.Item>
        </NavDropdown>
       
        <Nav.Link
          style={{ color: "black", fontWeight: "bold" }}
          href="/people/1"
        >
          People
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
   {/* / </Navbar.Collapse> */}
    </Container>
  </Navbar>
  );
}
