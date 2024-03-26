import Button from "./button";

let styling = {
    color: '#198754'
}

const ShopFooter = () => {
    return (
        <div style={styling} className="container text-center py-4">
            <a href="/account" className="link-secondary"> Back </a>
            <br/><br/><br/>
        </div>
    )
}


export default ShopFooter;