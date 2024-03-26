import {useState} from "react";

let styling = {
    color: "#198754"

}
const AccountHeader = () => {
    const [currency, setCurrency] = useState(100);

    return(
        <div style={styling} className=" container text-center py-5">
            <br/>
            <h4> <b>Credits:</b> {currency}</h4>
            <br/>
            <h1><b>Account management</b></h1>
        </div>

    )
}

export default AccountHeader;