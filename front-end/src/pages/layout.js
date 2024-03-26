import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {

    return (
        <>
        <nav className="fixed-top">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>
    )

}

export default Layout;