import { Button, Rating } from "@mui/material";
import { useState, useEffect} from "react";
import { doc, updateDoc, getDocs, query, collection, where, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

import './LeaveRating.css'

function LeaveRating(props) {

    const otherUserUID = props.userID;
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const currentUserDocRef = doc(firestore, "User", currentUser.uid)
    const otherUserDocRef = doc(firestore, "User", otherUserUID)

    const [rating, setRating] = useState('');
    const [comment, setComment] = useState(''); 
    const [username, setUsername] = useState('');

    async function getUsername() {
        const un = (await getDoc(currentUserDocRef)).data().Username
        setUsername(un)
    }

    useEffect(() => {
        getUsername()
    }, []);

    const submit = async event => {
        event.preventDefault();
        try {
            await updateDoc(otherUserDocRef, {
                Rating: arrayUnion({
                    "userUID": currentUser.uid,
                    "username": username,
                    "comment": comment,
                    "rating": rating
                })
            })
        } catch(error) {
            alert("Feil: " + error)
        }
    }

    return (
        <div className="rating-form" style={{marginTop: "100px"}}>
            <form onSubmit={submit}>
                <h1> Legg til en rating </h1>
                <div className = "ratingComment">
                    <div className ="commentLabelWrapper">
                        <label className = "commentLabel" htmlFor="kommentar"> Kommentar: </label>
                    </div>
                    <textarea placeholder="Skriv her..." name = "commentInput" rows = "8" cols = "60" onChange={(event) => setComment(event.target.value)}></textarea>
                </div>
                
                <Rating sx={{ marginLeft: 20 }}
                name="simple-controlled"
                onChange={(event, newValue) => {
                setRating(newValue);
                }}

                />    
                <div className = "buttonWrapper">
                    <Button variant="outlined" type='submit'> Submit </Button>
                </div>
                
            </form>
        </div>
        
    )
}

export default LeaveRating;