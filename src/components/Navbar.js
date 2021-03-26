import React from 'react'
import { Navbar, Image } from 'react-bootstrap'
import logo from '../assets/gadjian logo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import foto from '../assets/Billy Setiadi.jpeg'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


export default function NavBar() {
    const userName = <p style={{"display":"inline", "color":"turquoise"}}>Billy Setiadi</p>
    return (
        <div>
            <Navbar bg="white" fixed="top" style={{height: "80px"}} className="navbar">
            <button id="toggleBtn" ><FontAwesomeIcon icon={faBars} size="2x" /></button>
            <Navbar.Brand href="#home"><img src={logo} alt="logo" id="brand"/></Navbar.Brand>
            <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text id="userText">Hello, {userName}</Navbar.Text>
                    <Image src={foto} width="50px" height="50px" roundedCircle />
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
