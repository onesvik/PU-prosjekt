import { Box, Button, Container, List, ListItem, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import './MyListings.css'
import { Navigate } from "react-router";
import LeaveRating from "./LeaveRating.js";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router";

const OtherUser = (props) => {

    const location = useLocation();
    const otherUserUID = props.getuser;

    const [username, setUsername] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState([]);
    const [totalRating, setTotalRating] = useState();
    const [otherUser, setOtherUser] = useState("");

    const getUserInfo = async (uid) => {
        const userDocRef = doc(firestore, "User", uid)
        await getDoc(userDocRef).then((documentSnapshot) => {
            setUsername(documentSnapshot.data().Username)
            setPhonenumber(documentSnapshot.data().Phonenumber)
            setEmail(documentSnapshot.data().Email)
            setRating(documentSnapshot.data().Rating)
            setTotalRating(documentSnapshot.data().totalRating)
            setOtherUser(uid)
        })
    }

    useEffect(() => {
        if (location.state !== null) {
            getUserInfo(location.state.uid)
        } else {
            getUserInfo(props.getuser)
        }
    }, []);

    if (totalRating > 0 && otherUser.length != "") {
        return (
            <Container style={{ marginTop: '100px' }}>
                <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
                    <div>
                        <div className="brukerInfo">
                            <h4>
                                Brukernavn: {username}
                            </h4>
                            <h4>
                                Email: {email}
                            </h4>
                            <h4>
                                Telefonnr: {phonenumber}
                            </h4>
                            <h3>
                                Rating: {Math.round(totalRating / rating.length * 10) / 10}
                            </h3>
                        </div>
                        <List>
                            {rating.map(rating => (
                                <Box key={rating} sx={{

                                    //justifyContent: "space-between",
                                    margin: "30px",
                                    mx: 'auto',
                                    width: 700

                                }}>

                                    <Paper elevation={3} style={{
                                        padding: 8,
                                        border: "1px solid black",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        verticalAlign: "middle"
                                    }}>
                                        <h4 className="addType">
                                            {rating.username}
                                        </h4>
                                        <div className="paperTitleAndDate">
                                            <h4>
                                                {rating.comment}
                                            </h4>
                                            <h3>
                                                Vurdering: {rating.rating}
                                            </h3>
                                        </div>

                                    </Paper>
                                </Box>
                            ))}
                        </List>
                        <LeaveRating userID={otherUser}></LeaveRating>

                    </div>
                </Typography>

            </Container>
        );
    } if (otherUser.length != "") {
        return (
            <Container style={{ marginTop: '100px' }}>
                <Typography variant='h3' sx={{ my: 4, textAlign: 'center', color: "primary.main" }}>
                    <div>
                        <h2 className="pageHeading">Brukerside</h2>
                        <h4>
                            Brukernavn: {username}
                        </h4>
                        <h4>
                            Email: {email}
                        </h4>
                        <h4>
                            Telefonnr: {phonenumber}
                        </h4>
                        <h3>
                            Rating: Ingen vurderinger
                        </h3>
                        <LeaveRating userID={otherUser}></LeaveRating>

                    </div>
                </Typography>

            </Container>
        );
    }

}

export default OtherUser;