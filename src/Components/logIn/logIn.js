import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function logIn(props) {
  const [email, changeEmail] = useState("");
  const [pass, changePass] = useState("");
  const [server, changeServer] = useState(false);
  const [taken, changeTaken] = useState(false);
  const [unauth, changeUnAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tokenstring");
    if (localStorage.getItem("tokenstring") != null) {
      axios
        .post("http://localhost:8000/verify", {
          token: localStorage.getItem("tokenstring"),
        })
        .then((res) => {
          if (res.status === 200) {
            props.history.push("/panel");
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("tokenstring");
          } else if (err.response.status === 403) {
            changeUnAuth(true);
            localStorage.removeItem("tokenstring");
          } else {
            changeServer(true);
          }
        });
    }
  }, []);

  const change = (e) => {
    if (e.target.name === "email") {
      changeEmail(e.target.value);
    } else if (e.target.name === "pass") {
      changePass(e.target.value);
    }
  };

  const signApi = (e) => {
    changeServer(false);
    changeTaken(false);
    e.preventDefault();
    if (email === "" || pass === "") {
      alert("Please enter valid credentials");
    } else {
      console.log(email, pass);
      axios
        .post("http://localhost:8000/", {
          email: email,
          pass: pass,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("tokenstring", res.data);
            props.history.push("/panel");
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            changeTaken(true);
          } else if (err) {
            changeServer(true);
          }
        });
    }
  };

  return (
    <div className="login">
      <h2>Welcome to SendMail</h2>
      {server ? (
        <div className="error" variant="danger">
          Server error! Please try again
        </div>
      ) : taken ? (
        <div className="error" variant="danger">
          Bad authentication request
        </div>
      ) : unauth ? (
        <div className="error" variant="danger">
          Unauthorized access
        </div>
      ) : (
        <></>
      )}
      <Form onSubmit={signApi}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={change}
            name="email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={change}
            name="pass"
          />
        </Form.Group>
        <Button style={{ marginLeft: 75 }} variant="primary" type="submit">
          Submit
        </Button>
        <br></br>
        <Link style={{ marginLeft: 85 }} to="/signUp">
          Sign Up
        </Link>
      </Form>
    </div>
  );
}

export default logIn;
