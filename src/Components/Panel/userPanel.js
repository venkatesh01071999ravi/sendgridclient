import React from "react"
import Nav from "./navbar/nav"
import {useState,useEffect} from "react"
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from "axios"
import "./panel.css"

function userPanel(props){

        console.log(props)
        const[det,changeDet] = useState({api:"",email:"",isprem:0,count:5})
        useEffect(()=>{

            if(localStorage.getItem("tokenstring") == null){

                    props.history.push("/")


            }

            var token = localStorage.getItem("tokenstring")
            axios.post("http://localhost:8000/fetch",{

                token:token

            })
            .then(res =>{

                if(res.status===200){

                    var email = res.data.email
                    email = email.substr(0,email.indexOf("@"))
                    localStorage.setItem("premium",parseInt(res.data.premium))
                    changeDet({

                        email:email,
                        isprem:parseInt(res.data.premium),
                        count:parseInt(res.data.count),
                        api:res.data.api

                    })

                }

            })
            .catch(err =>{

                if(err.response.status === 400){

                    localStorage.removeItem("tokenstring")
                    alert("Your session has expired")
                    props.history.push("/")
                    
                } else {

                    localStorage.removeItem("tokenstring")
                    alert("unauthorized access")
                    props.history.push("/")
                }

            })

        },[])


        return(

            <div>

               <Nav state={det.isprem}/>
               <div className="api">

                    Your Api Key is:<br></br>{det.api}

               </div>
               <div className="outer-wrap">
                <Jumbotron>
                <h1>Welcome back {det.email}</h1>
                        <br></br>
                        <p>
                        {det.isprem?<h4 style={{color:"green"}}>You are now a premium account holder!!You can send unlimited number of mails daily.</h4>:<h4>Available Mail Count for your Api Key: <span style={{color:"green"}}>{det.count}</span><br></br>You can avail Premium account to send unlimited number of Mails.</h4>}
                        </p>
                </Jumbotron>
               </div>

            </div>


        )

}

export default userPanel