import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import "./nav.css"

const query = "http://localhost:8000/payment/"+localStorage.getItem("tokenstring")

function navbar(props){

    
    const logout = ()=>{

        localStorage.removeItem("tokenstring")
        localStorage.removeItem("premium")
        window.location.href="/"

    }


    return(

        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/panel">Send Grid</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/mailing">Send Mail</Nav.Link>
                    <Nav.Link href="/History">Mail History</Nav.Link>
                   {props.state?<></>:<Nav.Link href={query}>Premium Account</Nav.Link>}
                </Nav>
                <Button variant="danger" onClick={logout}>Logout</Button>
            </Navbar.Collapse>
        </Navbar>



    )

}

export default navbar