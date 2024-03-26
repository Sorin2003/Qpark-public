import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet, Link, Router} from "react-router-dom"
import React from "react";

let styling = {
    color:"#A6A6A6",
    fontStyle:'normal',
    textDecoration: 'none',
    fontSize:'20px',
    dataType:'horizontal',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'

};

function NavbarM() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="fixed-top ">
                <Container>
                    <Link style={styling} to="account">Account</Link>
                    <Link style={styling} to="shop">Shop</Link>
                </Container>

            </Navbar>
            <Outlet />
        </div>
    );
}

export default NavbarM;