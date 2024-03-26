import React, {useState} from "react";
import "./../index.css";

let styling = {
    margin: "0px",
    width: "80%",
    borderColor: "#272D2D",
    border: "solid",
    boxShadow: "2px 2px #A6A6A6"
}

const InputBox = ({pl_text, ftype, handleChangeM, isDisabled}) => {
    const [inputText, setInputText] = useState("");

    const handleChange = (event) => {
            handleChangeM(event.target.value);
    }



    return (
        <input type={ftype} placeholder={pl_text} style={styling} className="form-control-lg my-2" onChange={(event) => handleChange(event)}/>
    )
}

export default InputBox;