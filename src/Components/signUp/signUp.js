import React from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./signup.css"
import {Link} from "react-router-dom"
import {useState,useEffect} from "react"
import axios from "axios"

function signUp(props){

    const[email,changeEmail] = useState("")
    const[pass,changePass] = useState("")
    const[server,changeServer] = useState(false)
    const[taken,changeTaken] = useState(false)
    const[success,changeSuccess] = useState(false)

    const change = (e)=>{

        
        if(e.target.name === "email"){

            changeEmail(e.target.value)

        }else if(e.target.name === "pass"){

            changePass(e.target.value)


        }


    }

    const signApi = (e)=>{
        
        changeServer(false)
        changeTaken(false)
        e.preventDefault()
        if(email === "" || pass===""){

            alert("Please enter valid credentials")

        }else{

            console.log(email,pass)
            axios.post('http://localhost:8000/signUp',{

            email:email,
            pass:pass

            }
            )
            .then(res => {

                if(res.status === 200){

                    changeSuccess(true)
                    setTimeout(()=>{

                            props.history.push('/')

                    },2000)


                }
                

            })
            .catch(err =>{

                
            if(err.response.status === 400){

                changeTaken(true)

            }else if(err){

                changeServer(true)

            }
                
            })            

        }


    }

    return(

        
        <div className="signUp">
            <h2>Register With Us</h2>
            {server?<div className="error" variant="danger">Server error! Please try again</div>
            :taken?<div className="error" variant="danger">You are already registered with us!!</div>
            :success?<div className="success" >Sucessfully registered and provided with api key</div>
            :<></>}
            <Form onSubmit={signApi}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required onChange={change} name="email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required onChange={change} name="pass" />
            </Form.Group>
            <Button style={{"marginLeft":75}} variant="primary" type="submit">
                Sign Up
            </Button>
            <br></br>
            <Link to="/" style={{"marginLeft":85}}>Log In</Link>
            </Form>

        </div>
    )


}

export default signUp