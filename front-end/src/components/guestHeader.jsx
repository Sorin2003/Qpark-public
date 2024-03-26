
let styling = {
    color: "#198754"

}
const GuestHeader = ({ownerInterval}) => {
    return(
        <div style={styling} className=" container text-center py-5">
            <h3 className="HText">
                {ownerInterval}
            </h3>
        </div>

    )
}

export default GuestHeader;