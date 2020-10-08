import React from 'react'
import {useState,useEffect} from "react"
import axios from "axios"
import Mail from "./mails/mails"
import "./mail.css"
import InfiniteScroll from 'react-infinite-scroll-component'
import Nav from "../Panel/navbar/nav"
import { Jumbotron } from 'react-bootstrap'

function mailHistory(props) {

    const[mails,changeMails] = useState([])
    const[more,changeMore] = useState(true)
    useEffect(()=>{

        
        if(localStorage.getItem("tokenstring") == null){

            props.history.push("/")
        
        }

        const token = localStorage.getItem("tokenstring")
        axios.post("http://localhost:8000/history",{

            token:token,
            call:0
        })
        .then(res => {

            changeMails(mails.concat(res.data))

        })
        .catch(err =>{

            console.log(err)

        })

    },[])

    const fetchData = ()=>{
        
        const token = localStorage.getItem("tokenstring")
        const lastarr = mails[mails.length-1]
        const lastid = lastarr[0]
        axios.post("http://localhost:8000/history",{

            token:token,
            call:lastid
        })
        .then(res => {

            if(res.data.length<4){

                changeMore(false)

            }
            changeMails(mails.concat(res.data))
            

        })
        .catch(err =>{

            console.log(err)

        })
    
    }

   
    const mail = mails.map((item)=>{

        return <Mail key={item[0]} items={item} />

    })
    return (
        <div>
           <Nav state={parseInt(localStorage.getItem("premium"))}/>
            <div className="note">

                *Note that mail history for your api is only provided
            
            </div>
            {mail.length<1?<div className="no-mess"><Jumbotron><h1>You have not sent any mail yet!!!!</h1></Jumbotron></div>:mail}
            <InfiniteScroll
                dataLength={mails.length} //This is important field to render the next data
                next={fetchData}
                hasMore={more}
                endMessage={
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",color:"white"}}>
                    <b>Yay! You have seen it all</b>
                    </div>
                }
            >
            </InfiniteScroll>
        </div>
    )
}

export default mailHistory
