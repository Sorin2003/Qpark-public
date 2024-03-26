import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import InputBox from "./inputBox";
import Button from "./button";
import {useNavigate} from "react-router-dom";

const SignupForm = ({handleName, handleEmail, handlePhone, handlePassword, buttonOnClickHandler}) => {


    const navigate = useNavigate();

    const handleRedirect = () => {
        try {
            navigate("/")
        } finally {
            navigate("/")
        }
    }

    return (
        <div className="container text-center" >
            <br/>
            <br/>
            <br/>
            <br/>
            <InputBox pl_text="Name" ftype="text" handleChangeM={handleName}/>
            <br/>
            <InputBox pl_text="Email" ftype="text" handleChangeM={handleEmail}/>
            <br/>
            <InputBox pl_text="Phone number" ftype="tel" handleChangeM={handlePhone}/>
            <br/>
            <InputBox pl_text="Password" ftype="password" handleChangeM={handlePassword}/>
            <br/>
            <Button text="Sign Up" colorClass="btn-success" onClickHandler={buttonOnClickHandler}/>
        </div>
    )
}

export default SignupForm;
