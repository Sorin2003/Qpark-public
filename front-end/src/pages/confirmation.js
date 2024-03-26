
let styling = {
    color:"#4CAC41",
    fontStyle:"normal",
    textDecoration: 'none',
    fontSize:"50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const Confirmation = () => {
    return(
    <div style={styling}>
        <p className="ConfirmationText text-center">
            You have successfully parked your car!
        </p>
    </div>
    )
}

export default Confirmation;