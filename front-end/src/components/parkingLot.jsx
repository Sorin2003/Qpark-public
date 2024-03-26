import React from "react";

const ParkingLot = ({id, startTime, endTime, occupied}) => {

    const styling = {
        "background": occupied === false ? "#4CAC41" : "#CB0000",
        "margin": "5px",
        "padding": "10px 20px",
        "cursor":"pointer",
        "borderRadius":"5px"
    }

    return (
        <div style={styling} className="row">
            <div className="col w-75 px-xxl-5 py-2">
                <h3 className="row px-5">Parking Lot {id} </h3>
                <h4>{startTime}{" - "}{endTime}</h4>
            </div>
            <div className="col w-25">
                <img src={require("../hbm.png")} alt="Welp" width={80} height={80}/>
            </div>
        </div>
    )
}

export default ParkingLot;