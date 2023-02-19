import React, { useContext, useEffect, useState } from 'react';
import { List, ListItem, Divider, Typography, ListItemText } from '@mui/material';
import axios from "axios";
import { useParams,Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import { userContext } from '../userContext';

const Institution = () => {

    const [institution, setInstitution] = useState(null)
    const { user } = useContext(userContext)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(0)
    const [description, setDescription] = useState("")
    const [donations, setDonations] = useState([])
    const [test, setTest] = useState(false)

    const { id } = useParams();

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        // get institution profile details
        axios.get(process.env.REACT_APP_BACKEND_URL + '/users/' + id, {}, {}).then((response) => {
            console.log(response);
            setInstitution(response.data)
        })
            .catch((error) => {
                console.log(error)
            });

        // get donations to this institution
        axios.get(process.env.REACT_APP_BACKEND_URL + '/donation/association/' + id, {}, {}).then((response) => {
            console.log(donations);
            setDonations(response.data)
            console.log(donations);
        })
            .catch((error) => {
                console.log(error)
            });

    }, [])

    const handleSubmit = (event) => {
        // request to add a new donation from this user providing the necessary details
        event.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND_URL + '/donation', {
            "value": parseInt(value),
            "description": description,
            "date": "Wed Jan 31 2022 15:54:40 GMT+0000 (Western European Standard Time)",
            "donatorId": user.id,
            "associationId": id
        }, {}).then((response) => {
            // get donations to this institution
            axios.get(process.env.REACT_APP_BACKEND_URL + '/donation/association/' + id, {}, {}).then((resp) => {
                console.log(donations);
                setDonations(resp.data)
                console.log(donations);
            })
            .catch((error) => {
                console.log(error)
            });
            closeModal()
        })
            .catch((error) => {
                console.log(error)
            });
    }
    const isUserLoggedIn = window.localStorage.getItem("isLoggedIn") ;
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
                contentLabel="Make a Donation"
                style={{ content: { marginTop: "7%", marginBottom: "7%", marginLeft: "30%", marginRight: "30%" } }}
            >

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Make a Donation</h2>

                    <button onClick={closeModal} className='border rounded px-3 py-2 bg-dark text-light'>Close</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <p>Value (ETH):    </p>
                    <input type="number" name="value" onChange={(e) => setValue(e.target.value)} />
                    <p></p>
                    <p>Description:</p>
                    <textarea name="description" onChange={(e) => setDescription(e.target.value)} style={{width:"50%", height:'90px'}}> </textarea>
                    <p></p>
                    <input type="submit" value="Submit" className='border rounded px-4 py-2 bg-dark text-light' />

                </form>
            </Modal>
            {institution != null ?
                <>
                    <div className='border border-2 rounded p-4 mt-4 shadow ' style={{backgroundColor: "#f7f7ff"}}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>{institution.name}</h2>
                            <button onClick={openModal} style={{ backgroundColor: "#3c3c3c", color: "#fff" }}
                            className = 'border rounded px-3'>
                                Donate
                            </button>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#FDFFFC" }} className='my-3 shadow-sm p-3' >
                            <h5>Current Ether:<span style={{ fontWeight: '400' }}> {institution.currentEther}  </span></h5>
                            <h5>Total number of donations received:<span style={{ fontWeight: '400' }}> {institution.donationsReceivedCounter}</span></h5>
                            <h5>Total value received in donations:<span style={{ fontWeight: '400' }}> {institution.totalCoinReceived} ETH </span></h5>
                        </div>
                        <div className='shadow-sm p-3 mt-3' style={{backgroundColor:"#FDFFFC"}}>    
                            <h5><span className='text-decoration-underline fw-bold'>Email :</span><span style={{ fontWeight: '400' }} className='ps-2'>{institution.email}</span></h5>
                            <h5><span className='text-decoration-underline fw-bold'>Public Address:</span><span style={{ fontWeight: '400' }} className='ps-2'>{institution.publicAddress}</span></h5>
                            <h5><span className='text-decoration-underline fw-bold'>Description:</span><span style={{ fontWeight: '400' }} className='ps-2'>{institution.description}</span></h5>
                        </div>
                    </div>

                    <h3 className='text-center text-decoration-underline mt-5'>Expenditures</h3>
                    <List sx={{ bgcolor: '#FDFFFC' }}>
                        {institution.expenditureList.map((transaction,index) => {
                            return (
                                <>
                                    <ListItem key={index} alignItems="flex-start" style={{ backgroundColor: "#FDFFFC" }} 
                                        className='shadow mt-3'
                                    >
                                        <ListItemText
                                            primary={"Transaction ID: " + transaction.id}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Transaction Value: {transaction.value}
                                                    </Typography> <p className='p-0 m-0'>
                                                        Transaction Justification: {transaction.justification}
                                                    </p>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </>
                            )
                        })}
                    </List>
                    <h3 className='text-center text-decoration-underline mt-5'>Donations Received</h3>

                    <List sx={{ bgcolor: '#FDFFFC' }}>
                        {donations.map((donation,index) => {
                            return (
                                <>
                                    <ListItem key={index} alignItems="flex-start" style={{ backgroundColor: "#FDFFFC" }} 
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
                    <button onClick={openModal}>
                        Donate
                    </button>
                </>
            }
        </div>
    );
};

export default Institution;