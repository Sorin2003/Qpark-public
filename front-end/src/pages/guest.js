import React, {useEffect, useState} from "react";
import GuestForm from "../components/guestForm";
import GuestFooter from "../components/guestFooter";
import axios from 'axios';
import GuestHeader from "../components/guestHeader";
import {useParams, useNavigate} from "react-router-dom";
const devURL = "http://192.168.137.116/api";

const baseURL = devURL;

const Guest = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [timeInterval, setTime] = useState("");

    const [res, setRes] = React.useState("");

    const navigate = useNavigate();

    const id = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );
    console.log(id);
    

    const updatePhone = number => {
        setPhoneNumber(number);
        console.log("phone update: " + phoneNumber);
    }

    const updateTime = timeInterval => {
        setTime(timeInterval);
        console.log("time update: " + timeInterval);
    }

    useEffect(() => {

        getData();

     },[]);
    
    function sendData() {
        axios
        .post(baseURL+"/new-park/", {
            park_id: id,
            phone: phoneNumber,
            occupied_until: timeInterval
        })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            navigate("/confirmation");
        }).catch(error => {
        });

    }

    function getData() {
        axios.get(baseURL+"/parking/"+id)
            .then((response) => {
                setRes("Spot is usually free between: \n\n" + response.data.interval_occupied_owner);
                console.log(response.data.interval_occupied_owner);
            }).catch(error => {
                setRes("This parking lot isn't owned by anybody.");
            });
    }

    return (
        <div className="text-center align-content-center">
            <GuestHeader ownerInterval={res} />
            <GuestForm handlePhone={updatePhone} handlePass={updateTime}  buttonOnClickHandler={sendData}/>
            <GuestFooter />
        </div>
    )

}

export default Guest;
