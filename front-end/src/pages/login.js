import React, {useState} from "react";
import LoginForm from "../components/loginForm";
import LoginHeader from "../components/loginHeader";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {devURL} from '../configs'
import { setAuthToken } from "../setAuthToken";

const baseURL = devURL;

const GuestPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const updateUserName = userName => {
        setUserName(userName);
    }

    const updatePassword = password => {
        setPassword(password); 
    }

    function postUserLogIn() {

        let formData = new FormData();    //formdata object

        formData.append('username', userName);   //append the values with key, value pair
        formData.append('password', password);

        axios
        .post(baseURL+"/token", formData, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
            console.log(response.data);
            const token = response.data.access_token;
            const userID = response.data.user_id;
            console.log(token);
            console.log(userID);

            localStorage.setItem("token", token);
            localStorage.setItem("userID", userID);

            setAuthToken(token);

            navigate("/account");
        }).catch(error => {
            setError(error);
            console.log(error.message);
        });
    }
    
    return (
        <div className="text-center align-content-center">
            <LoginHeader />
            <LoginForm handleUserName={updateUserName} handlePassword={updatePassword} buttonOnClickHandler={postUserLogIn} />
        </div>
    )

}

export default GuestPage;
