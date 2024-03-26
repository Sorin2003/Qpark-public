import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import InputBox from "./inputBox";
import Button from "./button";


const GuestForm = ({handlePhone, handlePass, buttonOnClickHandler}) => {
    return (
        <div className="container text-center" >
            <br/>
            <br/>
            <br/>
            <br/>
            <InputBox pl_text="Phone Number" ftype="tel" handleChangeM={handlePhone}/>
            <br/>
            <InputBox pl_text="Duration" ftype="time" handleChangeM={handlePass}/>
            <br/>
            <Button text="Park" colorClass="btn-success" onClickHandler={buttonOnClickHandler}/>
        </div>
    )
}


export default GuestForm;
