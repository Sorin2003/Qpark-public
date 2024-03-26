import { useState } from 'react'
import React from 'react'
import ParkingLot from "../components/parkingLot";
import Button from "../components/button";
import InputBox from "../components/inputBox";
import ParkingFooter from "../components/parkingFooter";
import { setAuthToken } from '../setAuthToken';
import axios from 'axios';
import {devURL} from '../configs';


const baseURL = devURL;

const token = localStorage.getItem("token");
const userID = localStorage.getItem("userID");
if (token) {
    setAuthToken(token);
}

const ParkingPage = ({spaces}) => {
    const [tempSpace, setTempSpace] = useState([
        {
            key: 1,
            timeStart: "00:00",
            timeEnd: "00:00"
        },
        {
            key: 2,
            timeStart: "07:00",
            timeEnd: "15:00"
        }
    ]);
    const [interval, setInterval] = useState([{
        timeStart: "00:00",
        timeEnd: "04:00"
    }]);

    const [startHour, setStartHour] = useState("");
    const [endHour, setEndHour] = useState("");
    const [res, setRes] = useState("");

    const updateStartHour = startHour => {
        setStartHour(startHour);
    }

    const updateEndHour = endHour => {
        setEndHour(endHour);
    }

    const addParkingSpace = (number, startTime, endTime) => {
        setTempSpace([...tempSpace, {number, interval}])

    }

    const boxStyling = {
        maxWidth: "66vh",
        margin: "1px auto",
        overflow: "auto",
        minHeight: "400px",
        padding: "1px"
    }

    const inputStyling = {
        maxWidth: "10%"
    }

    function postNewParkingLot() {

        const newLocation = "newLocation";
        const newInterval = startHour + " - " + endHour;

        setAuthToken(token);

        const parkingLot = {
            location: newLocation,
            interval_occupied_owner: newInterval,
            owner_id: userID
        }

        axios
        .post(baseURL+"/parking", parkingLot)
        .then((response) => {
            console.log(response.data);
        }).catch(error => {
            // setError(error);
            console.log(error.message);
        });
    }

    function getParkingLots() {

        setAuthToken(token);

        axios
        .get(baseURL+"/owner/parking/" + userID)
        .then((response) => {
            console.log(response.data);
            setRes(response.data);
        }).catch(error => {
            // setError(error);
            console.log(error.message);
        });
    }

    getParkingLots();

    return (
        <div className="container text-center">
            <Button text={"Add Parking Lot"} onClickHandler={postNewParkingLot}/>
            <label>Start hour:</label>
            <InputBox style={inputStyling} pl_text="startHour" ftype="time" handleChangeM={updateStartHour}/>
            <label>End hour:</label>
            <InputBox style={inputStyling} pl_text="endHour" ftype="time" handleChangeM={updateEndHour}/>
            <br/>
            <br/>
            <div style={boxStyling}>
                {tempSpace.map((res) => (
                    <ParkingLot key = {res.id} endTime = {res.interval_occupied_owner} />
                ))}
            </div>
            <ParkingFooter/>
        </div>
    )
}

export default ParkingPage;
