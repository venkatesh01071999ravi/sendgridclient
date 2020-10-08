import React from 'react';
import './App.css';
import {Route,BrowserRouter,Switch} from "react-router-dom"
import logIn from "./Components/logIn/logIn"
import signUp from "./Components/signUp/signUp"
import userPanel from "./Components/Panel/userPanel"
import Mailing from "./Components/sendMail/sendMail"
import History from "./Components/mailHistory/mailHistory"
import 'react-bootstrap/dist/react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  return (
    <BrowserRouter>
      <Switch>

          <Route path="/" exact component={logIn}></Route>
          <Route path="/signUp" exact component={signUp}></Route>
          <Route path="/panel" exact component={userPanel}></Route>
          <Route path="/mailing" exact component={Mailing}></Route>
          <Route path="/History" exact component={History}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
