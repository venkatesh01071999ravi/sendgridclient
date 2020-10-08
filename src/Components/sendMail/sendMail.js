import React from "react"
import Nav from "../Panel/navbar/nav"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Jumbotron from "react-bootstrap/Jumbotron"
import swal from 'sweetalert'
import {useState,useEffect} from "react"
import axios from "axios"
import "./sendmail.css"

function sendMail(props){

    const [api,changApi] = useState("")
    const[to,changeTo] = useState("")
    const[sub,changeSub] = useState("")
    const[body,changeBody] = useState("")

    
    useEffect(()=>{

        if(localStorage.getItem("tokenstring") == null){

            props.history.push("/")
        
        }


    })

    const change = (e)=>{

        if(e.target.name === "api"){

            changApi(e.target.value)

        } else if(e.target.name === "to"){

            changeTo(e.target.value)

        } else if(e.target.name === "sub"){

            changeSub(e.target.value)

        }else{

            changeBody(e.target.value)

        }


    }

    const send = (f)=>{

        const token = localStorage.getItem("tokenstring")
        f.preventDefault()
        axios.post("http://localhost:8000/send",{

            "token": token,
            "api":api,
            "to":to,
            "subject":sub,
            "body":body


        })
        .then(res =>{

            if(res.status === 200){

                swal("Success",res.data, "success")
                .then((value)=>{

                    props.history.push("/panel")

                })

            }

        })
        .catch(err =>{

            if(err.response.status === 400){

                swal("Awwww Snap!!!", "The mail count for the api_key is over please purchase premium account for that api", "error")
                .then((value)=>{

                    props.history.push("/panel")

                })


            } else if(err.response.status === 403){

                swal("Bad Request", "That api key is not valid", "error")
                .then((value)=>{

                    props.history.push("/panel")

                })


            } else {

                swal("Server Error", "Please try again later", "error")
                .then((value)=>{

                    props.history.push("/panel")

                })



            }

        })
    }

    return(

        <div>
            <Nav state = {parseInt(localStorage.getItem("premium"))}></Nav>
            <div className="form-wrapper">
                <Jumbotron className="form-outside">
                    <h3>Mail Form</h3>
                    <Form onSubmit={send}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Api Key</Form.Label>
                            <Form.Control type="text" required placeholder="Enter Api Key" name="api" onChange={change} />
                            <Form.Text className="text-muted">
                            Note that email repective to api_key will be "From" mail address
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>To Mail Address</Form.Label>
                            <Form.Control type="email" required placeholder="Enter to mail address" name="to" onChange={change} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="Subject" name="sub" onChange={change} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Email Body</Form.Label>
                            <Form.Control as="textarea" rows="4" name="body" onChange={change}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send
                        </Button>
                    </Form>
                </Jumbotron>
            </div>

        </div>


    )

}

export default sendMail