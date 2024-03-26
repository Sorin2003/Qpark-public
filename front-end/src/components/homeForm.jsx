import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import InputBox from "./inputBox";
import Button from "./button";

const HomeForm = ({handleTime, buttonOnClickHandler}) => {
    return (
        <div className="container text-center" >
            <InputBox pl_text="Duration" ftype="time" handleChangeM={handleTime}/>
            <br/>
            <Button text="Park" colorClass="btn-success" onClickHandler={buttonOnClickHandler}/>
        </div>
    )
}

export default HomeForm;
