import React from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { addUser } from './IO.js'
import './NewUser.css';
import { useNavigate } from "react-router";

function RegisterNewUser() {

    const auth = getAuth()
    const navigate = useNavigate();

    const handleSubmit = (submit) => {
        submit.preventDefault()

        const email = submit.target.emailInput.value
        const password = submit.target.passwordInput.value
        const phonenumber = submit.target.phonenumberInput.value
        const username = submit.target.usernameInput.value

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log("User created", cred.user)
                addUser(cred.user.uid, username, password, email, phonenumber, [], [], [], [], null);
            })
            .catch((e) => {
                console.log(e.message)
            })
        window.alert("Gratulerer, du har nå opprettet en ny bruker!")
            navigate("/Min Profil");
    }

    return (
        <div className="ny-bruker-form" style={{ marginTop: "100px" }}>
            <form onSubmit={handleSubmit}>
                <h1> Registrer ny bruker </h1>
                <div>
                    <label htmlFor="e-post"> E-post: </label>
                    <input type="text" placeholder="E-post" name="emailInput" required />
                </div>
                <div>
                    <label htmlFor="brukernavn"> Brukernavn: </label>
                    <input type="text" placeholder="Brukernavn" name="usernameInput" required />
                </div>
                <div>
                    <label htmlFor="telefon-nummer"> Telefon nummer: </label>
                    <input type="text" placeholder="Telefon nummer" name="phonenumberInput" required />
                </div>
                <div>
                    <label htmlFor="passord"> Passord (minst 6 tegn): </label>
                    <input type="text" placeholder="Passord" name="passwordInput" required />
                </div>
                <button class="shadow"> Registrer deg! </button>
            </form>
        </div>
    )
}

export default RegisterNewUser;