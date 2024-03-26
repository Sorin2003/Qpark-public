import React from "react";
import NavbarM from "../components/navbar";
import AccountForm from "../components/accountForm";
import {useState} from "react";
import AccountHeader from "../components/accountHeader";
import AccountFooter from "../components/accountFooter";
import {useParams} from "react-router-dom";

const AccountPage = ({emaiiAddress, phoneNumber, buttonOnClickHandler}) => {
    const [email, setEmail] = useState("");
    const [phnNumber, setPhoneNumber] = useState("");

    const updateEmail = (email) => {
        setEmail(email);
    };

    const updatePhoneNumber = (number) => {
        setPhoneNumber(number);
    }


    return(
        <div>
            <AccountHeader />
            <AccountForm handlePhone={updatePhoneNumber} handleEmail={updateEmail} ></AccountForm>
            <AccountFooter/>
        </div>
    )
}

export default AccountPage;