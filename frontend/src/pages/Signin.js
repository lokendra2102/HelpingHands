import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios"
import { userContext } from "../userContext";
import { useHistory } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory()
  const {user, setUser} = useContext(userContext)
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // attempt to sign in with the provided data
    axios.post(process.env.REACT_APP_BACKEND_URL + '/users/login', {
      "email": email,
  }, {}).then((response) => {
      setUser(response.data)
      history.push("/about")
    })
      .catch((error) => {
          console.log(error)
      });
  }

  return (
    <div style={{ backgroundColor: "#f2f2f2", height:'100vh', paddingTop: '10%', display:'flex', justifyContent:'center'  }}>
      <Form onSubmit={handleSubmit} style={{margin: "0 auto", justifyContent:'center'}}>
        <Form.Group size="lg" controlId="email">
          <h4>Email</h4>

          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor:"#f2f2f2", borderColor:"#e2e2e2", borderWidth: 1, marginBottom:"15%", height:"30px", width:"300px"}}
            />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <h4>Password

            </h4>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor:"#f2f2f2", borderColor:"#e2e2e2", borderWidth: 1, marginBottom:"15%", height:"30px", width:"300px"}}

            />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}  style={{ backgroundColor: "#3c3c3c", color: "#fff", width: "100%", height: "50px" }}>
          Sign In
        </Button>
      </Form>
    </div>
  );
}