import React, {useState} from "react";
import HomeHeader from "../components/homeHeader";
import axios from "axios";
import baseURL from "./guest"
import NavbarM from "../components/navbar";
import {Button} from "react-bootstrap";
import InputBox from "../components/inputBox";
import ParkingLot from "../components/parkingLot";


const Home = () => {
    const [timeM, setTime] = useState("");
    const [view, setView] = useState(0);

    const updateTime = timeM => {
        setTime(timeM);
        console.log("time update: " + timeM);
    }

    function sendData() {
        axios
            .post(baseURL+"/guests/", {
                phone: 123,
                //   timeInterval: timeM
            })
            .then((response) => {
                console.log(response);
                console.log(response.data);
            });
    }

    function getData() {
        axios.get(baseURL+"/users/1")
            .then((response) => {
                console.log(response);
                console.log(response.data);
            })
    }
    let styling = {
        backgroundColor:'#CB0000',
        color:'#CB0000',

    }

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

    return (
        <div className="container text-center">
            <NavbarM/>
            <HomeHeader/>
            <div style={boxStyling}>
                {tempSpace.map((tSpace) => (
                    <ParkingLot key = {tSpace.key} startTime={tSpace.timeStart} endTime={tSpace.timeEnd} occupied={false}/>
                ))}
            </div>
        </div>

    )

}

export default Home;