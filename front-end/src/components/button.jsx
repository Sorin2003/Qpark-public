import React from "react";

let styling = {
    backgroundColor: "#272D2D",
    outlineColor: "22ff22"
}

const Button = ({text, onClickHandler}) => {

    return (
        <button className="btn btn-primary btn-lg col-6 mt-4 btn-success" onClick={onClickHandler}> {text} </button>
    )
}
 
export default Button;