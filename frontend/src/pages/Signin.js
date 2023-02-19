import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios"
import { userContext } from "../userContext";
import { useHistory } from "react-router-dom";
import { FormText } from "react-bootstrap";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory()
  const signUpPage = () => {
    history.push("/signup");
  }
  const {user, setUser} = useContext(userContext)
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // attempt to sign in with the provided data
    axios.post(process.env.REACT_APP_BACKEND_URL + '/users/login', {
      "email": email,
      "password" : password
  }, {}).then((response) => {
      setUser(response.data)
      history.push("/about")
      localStorage.setItem("isLoggedIn",true)
    })
      .catch((error) => {
          console.log(error)
      });
  }

  return (
    <div style={{ backgroundColor: "#f2f2f2", height:'100vh', paddingTop: '10%', display:'flex', justifyContent:'center'  }}>
      <Form onSubmit={handleSubmit} className="p-4 border border-3 border-solid border-rounded" style={{margin: "0 auto", justifyContent:'center', height:'50vh'}}>
        <h2 className='fw-bold'>Signin to proceed further</h2>  
        <Form.Group className="mt-5" size="lg" controlId="email">
          <h5>Email</h5>

          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor:"#f2f2f2", borderColor:"#e2e2e2", borderWidth: 1, marginBottom:"10%", height:"30px", width:"100%"}}
            />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <h5>Password

            </h5>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor:"#f2f2f2", borderColor:"#e2e2e2", borderWidth: 1, marginBottom:"10%", height:"30px", width:"100%"}}

            />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}  style={{ backgroundColor: "#3c3c3c", color: "#fff", width: "100%", height: "50px" }}>
          Sign In
        </Button>
        <FormText className="d-flex justify-content-center align-items-center mt-3"
          onClick = {signUpPage}
        >Don't have an account?
          <span className="ms-2 text-decoration-underline">Signup here.</span>
        </FormText>
      </Form>
    </div>
  );
}