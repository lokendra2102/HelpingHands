import React, { useContext, useEffect, useState } from 'react';
import { List, ListItem, Divider, Typography, ListItemText } from '@mui/material';
import axios from "axios";
import { useParams,Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import { userContext } from '../userContext';

const UserProfile = () => {
    
    const { user, setUser } = useContext(userContext)
    const [donations, setDonations] = useState([])

    const [modalIsOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(0)


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        // get donations made by this user
        axios.get(process.env.REACT_APP_BACKEND_URL + '/donation/donator/' + user.id, {}, {}).then((response) => {
            setDonations(response.data)

        })
            .catch((error) => {
                console.log(error)
            });

    }, [])

    const handleSubmit = (event) => {
        // add funds to the user's account
        event.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND_URL + '/users/' + user.id + '/addFunds', {
            "amount": parseInt(value),
        }, {}).then((response) => {
            console.log(response)
            let userAux = user;
            userAux.currentEther += parseInt(value);
            setUser(userAux);
            closeModal()
        })
        .catch((error) => {
            console.log(error)
        });
    }
    const isUserLoggedIn = window.localStorage.getItem("isLoggedIn") ;
    console.log(isUserLoggedIn)
    if(!isUserLoggedIn){
      return <Redirect to={"/Signin"}/>
    }
    return (
        <div
            style={{
                justifyContent: 'left',
                alignItems: 'left',
                height: '100vh',
                padding: "0.2rem calc((100vw - 1000px) / 7)",
                backgroundColor: "#FDFFFC"
            }}
        >
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Funds"
                style={{ content: { marginTop: "7%", marginBottom: "20%", marginLeft: "30%", marginRight: "30%" } }}
            >

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Add Funds</h2>

                    <button onClick={closeModal} style={{}} className="bg-dark text-light px-3 py-2 border rounded" >Close</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <p>Value (ETH):    </p>
                    <input type="number" name="value" onChange={(e) => setValue(e.target.value)} />
                    <p></p>
                    <input type="submit" value="Submit" style={{ backgroundColor: "#3c3c3c", color: "#fff", width: "25%", height: "40px" }} />

                </form>
            </Modal>

            {user != null ?
                <>

                    <div className='border border-2 rounded p-4 mt-4 shadow ' style={{backgroundColor: "#f7f7ff"}}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>{user.name}</h2>
                            <button onClick={openModal} style={{ backgroundColor: "#3c3c3c", color: "#fff" }}
                                className = 'border rounded px-3'
                            >
                                Add Funds
                            </button>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#FDFFFC" }} className='my-3 shadow-sm p-3' >
                            <h5>Current Ether:<span style={{ fontWeight: '400' }}> {user.currentEther}  </span></h5>
                            <h5>Total number of donations made:<span style={{ fontWeight: '400' }}> {user.donationsSentCounter}</span></h5>
                            <h5>Total value sent in donations:<span style={{ fontWeight: '400' }}> {user.totalCoinDonated} </span></h5>
                        </div>
                        <div className='shadow-sm p-3 mt-3' style={{backgroundColor:"#FDFFFC"}}>    
                            <h5>Email: <span style={{ fontWeight: '400' }}>{user.email}</span></h5>
                            <h5>Public Address: <span style={{ fontWeight: '400' }}>{user.publicAddress}</span></h5>
                        </div>
                    </div>

                    <h3 style={{ marginTop: '3%' }} className='text-center text-decoration-underline'>Donations</h3>

                    <List sx={{ bgcolor: '#FDFFFC' }}>
                        {donations.map((donation) => {
                            return (
                                <>
                                    <ListItem alignItems="flex-start" style={{ backgroundColor: "#FDFFFC" }} 
                                        className='shadow mt-3'
                                    >
                                        <ListItemText
                                            primary={"Donation ID: " + donation.id}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Donation Value: {donation.value}
                                                    </Typography> <p className='p-0 m-0'>
                                                        Donation Description: {donation.description}
                                                    </p>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </>
                            )
                        })}
                    </List>
                </>
                :
                <>
                </>
            }
        </div>
    );
};

export default UserProfile;