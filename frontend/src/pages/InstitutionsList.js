
import React, { useState, useEffect, useContext } from 'react';
import { List, ListItem, Divider, Typography, ListItemText, Button } from '@mui/material';
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { userContext } from '../userContext';
const InstitutionsList = ({ navigation }) => {

    const [institutions, setInstitutions] = useState([])
    let history = useHistory()
    const { user } = useContext(userContext)
    useEffect(() => {
        // get a list of all the institutions
        axios.get(process.env.REACT_APP_BACKEND_URL + '/users/associations/list', {}, {}).then((response) => {
            setInstitutions(response.data)
        })
            .catch((error) => {
                console.log(error)
            });

    }, [])

    const goToInstitution = (id) => {
        if (user.role == "association")
            history.push("/institutionProfile/" + id)
        else
            history.push("/institution/" + id)
    }
    return (
        <div
            style={{
                justifyContent: 'left',
                alignItems: 'left',
                height: '100vh',
                padding: "0.2rem calc((100vw - 1000px) / 10)"
            }}
        >
            <h1>Institutions</h1>
            <List sx={{ bgcolor: 'background.paper' }}>
                {institutions.map((institution) => {
                    return (
                        <><ListItem alignItems="flex-start">

                            <button
                                onClick={() => goToInstitution(institution.id)}
                                type="button"
                                className="btn btn-color btn-size"
                            >
                                <ListItemText
                                    primary={institution.name}
                                    secondary={<React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {institution.supportType}
                                        </Typography> <p>
                                            {institution.description}
                                        </p>

                                    </React.Fragment>} />

                            </button>
                        </ListItem>
                            <Divider variant="middle" component="li" /><Divider variant="middle" component="li" />
                        </>
                    )
                })}
            </List>
        </div>
    );
};

export default InstitutionsList;