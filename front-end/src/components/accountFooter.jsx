import Button from "./button";

let styling = {
    color: '#198754'
}

const AccountFooter = () => {
    return (
        <div style={styling} className="container text-center py-4">
            <a href="/" className="link-secondary"> Back </a>
            <br/><br/><br/>
        </div>
    )
}


export default AccountFooter;