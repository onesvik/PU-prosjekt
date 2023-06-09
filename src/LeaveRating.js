import { Button, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { doc, updateDoc, getDocs, query, collection, where, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import './LeaveRating.css'
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function LeaveRating(props) {

    const otherUserUID = props.userID;
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    const otherUserDocRef = doc(firestore, "User", otherUserUID)

    const [rating, setRating] = useState();
    const [comment, setComment] = useState('');
    const [username, setUsername] = useState('');
    const [totalRating, setTotalRating] = useState();
    const navigation = useNavigate();
    
    async function getUsername() {
        const currentUserDocRef = doc(firestore, "User", currentUser.uid)
        const un = (await getDoc(currentUserDocRef)).data().Username
        setUsername(un)
    }

    async function getTotalRating() {
        const tr = (await getDoc(otherUserDocRef)).data().totalRating
        setTotalRating(tr)
    }

    useEffect(() => {
        if (currentUser) {
            getUsername()
            getTotalRating()
            setRating(5)
        }
    }, [currentUser]);

    const submit = async event => {
        event.preventDefault();
        try {
            await updateDoc(otherUserDocRef, {
                Rating: arrayUnion({
                    "userUID": currentUser.uid,
                    "username": username,
                    "comment": comment,
                    "rating": rating
                }),
                totalRating: Number(Number(totalRating) + Number(rating))
            })
            navigation("/Alle Annonser");
        } catch (error) {
            alert("Feil: " + error)
        }
    }

    return (
        <div className="rating-form">
            <form onSubmit={submit}>
                <h2> Legg til en rating </h2>
                <div className="ratingComment">
                    <div className="commentLabelWrapper">
                        <label className="commentLabel" htmlFor="kommentar"> Kommentar: </label>
                    </div>
                    <textarea placeholder="Skriv her..." name="commentInput" rows="8" cols="60" onChange={(event) => setComment(event.target.value)} required></textarea>
                </div>

                <Rating sx={{ marginLeft: 20 }}
                    name="simple-controlled"
                    defaultValue={5}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                <div className="buttonWrapper">
                    <Button variant="outlined" type='submit'> Submit </Button>
                </div>

            </form>
        </div>

    )
}

export default LeaveRating;