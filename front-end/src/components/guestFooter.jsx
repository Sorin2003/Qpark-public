import Button from "./button";

let styling = {
    color: '#198754'
}

const GuestFooter = () => {
    return (
        <div style={styling} className="container text-center py-4">
            <br/>
            <br/>
            <br/>
            <br/>
            <a href="/login" className="link-secondary"> Already have an account? Log in.</a>
            <br/>
            <a href="/signup" className="link-secondary"> Don't have an account? Sign up.</a>
            <footer style={styling} className="p-3"> QPark </footer>
        </div>
    )
}


export default GuestFooter;