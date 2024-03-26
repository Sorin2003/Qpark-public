import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Guest from "./pages/guest";
import Home from "./pages/home";
import LayoutRoot from "./components/layoutRoot";
import GuestForm from './components/guestForm';
import NavbarM from "./components/navbar";
import {Nav} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Confirmation from "./pages/confirmation"
import AccountPage from "./pages/account"
import { setAuthToken } from './setAuthToken';
import ParkingPage from "./pages/parking";
import Shop from "./pages/shop";

export default function App() {

  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LayoutRoot />}>
                  <Route path="guest/:id/" element ={<Guest />} />
                  <Route path="guest" element ={<Guest />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="confirmation" element ={<Confirmation />} />
                  <Route path="account" element={<AccountPage/>} />
                  <Route path="shop" element={<Shop/>} />
                  <Route path="parking" element={<ParkingPage/>} />
                  <Route index element={<Home />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
          <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

