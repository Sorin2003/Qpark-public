import React from "react";
import InputBox from "./inputBox";
import Button from "./button";
import {useNavigate} from "react-router-dom";

const AccountForm = ({handleEmail, handlePhone, handlePass, buttonOnClickHandler}) => {

    const styling = {
        width: "60px"
    }

    const navigate = useNavigate();

    const handleRedirect = () => {
        try {
            navigate("/parking")
        } finally {
            navigate("/parking")
        }
    }


    return (
        <div className="container text-center">
            <br/><InputBox pl_text="Username" ftype="text" />
            <br/>
            <br/><InputBox pl_text="Change Email" ftype="text" handleChangeM={handleEmail}/>
            <br/>
            <br/><InputBox pl_text="Change Phone Number" ftype="tel" handleChangeM={handlePhone}/>
            <br/>
            <Button text="Save" colorClass="btn-success"  onClickHandler={buttonOnClickHandler}/>
                <br/>
                <Button text="Manage owned spots" colorClass="btn-success" onClickHandler={handleRedirect}/>
        </div>
    )
}

export default AccountForm;