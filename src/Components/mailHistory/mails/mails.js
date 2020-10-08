import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import "./mails.css"

function Mails(props) {

    return (
        <div className="mail-wrap">
            <Jumbotron className="mails">
               <div>

                    <h4>To:</h4>
                    <div style={{fontSize:"18px",display:"flex",flexWrap:"wrap"}}>{props.items[1]}</div>
               </div>
               <div>

                    <h4>Subject:</h4>
                    <div style={{width:"60px",fontSize:"17px",display:"flex",flexWrap:"wrap"}}>{props.items[2]}</div>            

               </div>
               <div>

                    <h4>Message:</h4>
                    <div style={{width:"120px",fontSize:"17px",display:"flex",flexWrap:"wrap"}}>{props.items[3]}</div>            

               </div>
               <div>

                    <h4>Date:</h4>
                    <span style={{fontSize:"18px"}}>{props.items[4]}</span>         

               </div>
            </Jumbotron>
        </div>
    )
}

export default Mails
