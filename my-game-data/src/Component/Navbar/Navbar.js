import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import NavbarStyle from './Navbar.module.css'

const MyNavbar = props=>{
    return(
        <>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/" className={NavbarStyle.paddingleft}>Game Info</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className={NavbarStyle.right}>
                <Link to="/Discount">Best Discount</Link>
                <Link to="/Settings">Settings</Link>
                <Link to="/About">About</Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        </>
    )
}

export default MyNavbar