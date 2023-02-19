import React,{ useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, InputGroup, FormText } from 'react-bootstrap';

import axios from "axios"
import { useHistory } from "react-router-dom";
import { userContext } from "../userContext";


function Signup() {
    const userDTO = {
        "name": "",
        "password": "",
        "email": "",
        "role": "Donator",
        "currentEther": 0,
        "description": "",
    }
    const [ user, setUserData ] = useState(userDTO);

    let history = useHistory()
    const signInPage = () => {
        history.push("/signin")
    }
    const {setUser} = useContext(userContext)

    function validateForm() {
        return user.email.length > 0 && user.password.length > 0 && user.name.length > 0 && user.role && user.currentEther === 0 && user.description > 0;
    }
    function handleSubmit(event) {
        const isValidUserData = validateForm();
        const userServerDTO = user;
        if(user.role === "Donator"){
            userServerDTO.country = "India"
        }else{
            userServerDTO.expenditureList = []
        }
        console.log(userServerDTO);
        if(validateForm){
            // attempt to sign in with the provided data
            axios.post(process.env.REACT_APP_BACKEND_URL + '/users', {
                "name": user.name,
                "password": user.password,
                "email": user.email,
                "role": user.role === "Donator" ? "donator" : "association",
                "currentEther": 0,
                "description": user.description,
                "expenditureList": []
            }, {}).then((response) => {
                setUser(response.data)
                history.push("/about")
                localStorage.setItem("isLoggedIn",true)
            })
            .catch((error) => {
                console.log(error)
            });
        }else{
            alert("Kindly check your input.")
        }
    }

    return (
        <>
            <Container fluid style={{ backgroundColor: "#f2f2f2", height:'100vh' ,maxHeight : '100vh', paddingTop: '5%', display:'flex', justifyContent:'center', overflow: 'hidden' }}>
                <Row >
                    <Form className = "p-4 border border-3 border-solid border-rounded" style={{height:'75vh'}}>
                       <h2 className='fw-bold'>Create new account</h2>  
                        <Form.Group className="mt-5 mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" className='w-100' 
                            onChange={(e) => {
                                setUserData(user => ({
                                    ...user,
                                    name : e.target.value
                                }));
                            }} value={user.name} placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={user.email} placeholder="Enter email"
                            onChange={(e) => {
                                setUserData(user => ({
                                    ...user,
                                    email : e.target.value
                                }));
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={user.password} placeholder="Password"
                                onChange={(e) => {
                                    setUserData(user => ({
                                        ...user,
                                        password : e.target.value
                                    }));
                                }} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Please select an option</Form.Label>
                            <Form.Select value={user.role} onChange={(e) => {
                                setUserData((user) => ({
                                    ...user,
                                    role : e.target.value
                                }))
                            }}>
                                <option>Donator</option>
                                <option>Organization</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Label>Description</Form.Label>
                        <InputGroup className='mb-3'>
                            <Form.Control as="textarea" value={user.description} aria-label="With textarea" 
                                onChange={(e) => {
                                    setUserData(user => ({
                                        ...user,
                                        description : e.target.value
                                    }));
                                }} 
                            />
                        </InputGroup>
                        <Button variant="dark" className='w-100' type="button" onClick={() => { handleSubmit(user) }}>
                            Submit
                        </Button>
                        <FormText className='d-flex justify-content-center align-items-center mt-3' >
                            Have an account ?<span className='ms-2 text-decoration-underline' onClick={signInPage}>Signin here.</span>
                        </FormText>
                    </Form>
                </Row>  
            </Container>
        </>
    )
}

export default Signup