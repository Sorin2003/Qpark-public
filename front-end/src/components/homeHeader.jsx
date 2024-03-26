
let styling = {
    color: "#198754",
    fontSize:"40px",
}
const HomeHeader = () => {
    return(
        <div style={styling} className=" container text-center py-5">
            <p className="HText"><b>Your parking spot</b>
                <br/>
                <b>status is:</b>
            </p>
        </div>
    )
}

export default HomeHeader;