import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import InputBox from "./inputBox";
import Button from "./button";

import {useNavigate} from "react-router-dom";

const GuestForm = ({handleUserName, handlePassword, buttonOnClickHandler}) => {

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
            <br/><br/><br/><br/>
            <InputBox pl_text="Username" ftype="text" handleChangeM={handleUserName}/>
            <br/>
            <InputBox pl_text="Password" ftype="password" handleChangeM={handlePassword}/>
            <br/>
            <Button text="Log In" colorClass="btn-success" onClickHandler={buttonOnClickHandler}/>
        </div>
    )
}

export default GuestForm;
