import React, { useEffect, useState } from 'react';
import { List, ListItem, Divider, Typography, ListItemText } from '@mui/material';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';

const InstitutionProfile = () => {

    const [institution, setInstitution] = useState(null)
    const [donations, setDonations] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(0)
    const [justification, setJustification] = useState("")

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
            setInstitution(response.data)

        })
            .catch((error) => {
                console.log(error)
            });

        // get donations made to this institution
        axios.get(process.env.REACT_APP_BACKEND_URL + '/donation/association/' + id, {}, {}).then((response) => {
            setDonations(response.data)
        })
            .catch((error) => {
                console.log(error)
            });
    }, [])

    const handleSubmit = (event) => {
        // add a justification for an expenditure
        event.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND_URL + '/users/' + id + '/expenditure', {
            "value": parseInt(value),
            "justification": justification,
            "date": "Wed Jan 31 2022 15:54:40 GMT+0000 (Western European Standard Time)"
        }, {}).then((response) => {
            console.log(response)
            closeModal()
        })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <div
            style={{
                justifyContent: 'left',
                alignItems: 'left',
                height: '100vh',
                padding: "0.2rem calc((100vw - 1000px) / 7)",
                backgroundColor: "#f2f2f2"
            }}
        >
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add a Transaction"
                style={{ content: { marginTop: "7%", marginBottom: "7%", marginLeft: "25%", marginRight: "25%" } }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2>Add an Expenditure</h2>
                    <button onClick={closeModal} style={{ backgroundColor: "#3c3c3c", color: "#fff", width: "10%", height: "40px" }}>Close</button>
                </div>
                <form onSubmit={handleSubmit}>

                    <p>
                        Value (ETH):
                    </p>
                    <input type="text" name="value" onChange={(e) => setValue(e.target.value)} />
                    <p></p>

                    <p>
                        Justification:
                    </p>
                    <textarea name="justification" onChange={(e) => setJustification(e.target.value)} style={{ width: "50%", height: '90px' }}> </textarea>
                    <p></p>

                    <input type="submit" value="Submit" style={{ backgroundColor: "#3c3c3c", color: "#fff", width: "25%", height: "40px" }} />

                </form>
            </Modal>
            {institution != null ?
                <>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2%" }}>
                        <h2>{institution.name}</h2>
                        <button onClick={openModal} style={{ backgroundColor: "#3c3c3c", color: "#fff", width: "7%", height: "50px" }}>
                            Add Expenditure
                        </button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                        <h5>Current Ether:<span style={{ fontWeight: '400' }}> {institution.currentEther}  </span></h5>
                        <h5>Total number of donations received:<span style={{ fontWeight: '400' }}> {institution.donationsReceivedCounter}</span></h5>
                        <h5>Total value received in donations:<span style={{ fontWeight: '400' }}> {institution.totalCoinReceived} ETH</span></h5>
                    </div>

                    <h5>Email: <span style={{ fontWeight: '400' }}>{institution.email}</span></h5>
                    <h5>Public Address: <span style={{ fontWeight: '400' }}>{institution.publicAddress}</span></h5>

                    <h5>Description: <span style={{ fontWeight: '400' }}>{institution.description}</span></h5>

                    <h3 style={{ marginTop: '3%' }}>Expenditures</h3>

                    <List sx={{ bgcolor: '#f2f2f2' }}>
                        {institution.expenditureList.map((transaction) => {
                            return (
                                <>
                                    <ListItem alignItems="flex-start" style={{ backgroundColor: "#f2f2f2" }} >
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
                                                    </Typography> <p>
                                                        Transaction Justification: {transaction.justification}
                                                    </p>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="middle" component="li" />
                                    <Divider variant="middle" component="li" />
                                </>
                            )
                        })}
                    </List>
                    <h3 style={{ marginTop: '3%' }}>Donations Received</h3>

                    <List sx={{ bgcolor: '#f2f2f2' }}>
                        {donations.map((donation) => {
                            return (
                                <>
                                    <ListItem alignItems="flex-start" style={{ backgroundColor: "#f2f2f2" }} >
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
                                                    </Typography> <p>
                                                        Donation Description: {donation.description}
                                                    </p>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="middle" component="li" />
                                    <Divider variant="middle" component="li" />
                                </>
                            )
                        })}
                    </List>
                </>
                :
                <>
                    <button onClick={openModal}>
                        Add Transaction
                    </button>
                </>
            }
        </div>
    );
};

export default InstitutionProfile;