import React, {useState} from "react";
import SignupForm from "../components/signupForm";
import SignUpHeader from "../components/signupHeader";
import {devURL} from "../configs";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const baseURL = devURL;

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const updateUserName = userName => {
        setUserName(userName);
        console.log("phone update: " + userName);
    }

    const updateEmail = email => {
        setEmail(email);
        console.log("time update: " + email);
    }

    const updatePhone = phoneNumber => {
        setPhone(phoneNumber);
        console.log("time update: " + phoneNumber);
    }

    const updatePassword = password => {
        setPassword(password);
        console.log("time update: " + password);
    }

    function postUserSignUpData() {
        axios
          .post(baseURL+"/users/", {
              user_name: userName,
              email: email,
              phone: phoneNumber,
              password: password
          })
          .then((response) => {
              console.log(response);
              console.log(response.data);
              navigate("/");
          });
      }

    return (
        <div className="text-center, align-content-center">
            <SignUpHeader/>
            <SignupForm handleName={updateUserName} handleEmail={updateEmail} handlePhone={updatePhone} handlePassword={updatePassword}
             buttonOnClickHandler={postUserSignUpData} />
        </div>
    )

}


export default Signup;
