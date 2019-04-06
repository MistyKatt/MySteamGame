import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import NavbarStyle from './Navbar.module.css'

const MyNavbar = props=>{
    return(
        <div >
        <Navbar bg="light" expand="lg">
        <Link to="/" className={NavbarStyle.paddingleft}>Game Info</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className={NavbarStyle.right}>
                <Link to="/featured">Featured Game</Link>
                <Link to="/Settings">Settings</Link>
                <Link to="/About">About</Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        </div>
    )
}

export default MyNavbar