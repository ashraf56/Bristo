import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './Firebase/firebase.config';
import axios from 'axios';




const auth = getAuth(app);
export let ContextAuth = createContext();
const googleprovider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {
    let [user, setUser] = useState(null);
    let [loader, setLodaer] = useState(true);


    let Createuser = (email, password) => {
        setLodaer(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    let google = () => {
        setLodaer(true)
        return signInWithPopup(auth, googleprovider)
    }
    let updateProf = (name, img) => {

        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: img
        })
    }

    let logout = () => {
        return signOut(auth);
    }


    let Login = (email, password) => {
        setLodaer(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    useEffect(() => {
        let Unsubscribe = onAuthStateChanged(auth,
            CurrentUser => {
                setUser(CurrentUser);

                if (CurrentUser) {
                    axios.post('http://localhost:5000/jwt', { email: CurrentUser.email })
                        .then((data) => {
                            localStorage.setItem('boss-token', data.data.token);
                            setLodaer(false);

                        })

                }
                else {
                    localStorage.removeItem('boss-token')
                }


            }
        )

        return () => {
            Unsubscribe();
        }

    }, [])

    const Authdata = {
        user, loader, Createuser, google, logout, Login, updateProf
    }

    return (

        <ContextAuth.Provider value={Authdata} >
            {children}
        </ContextAuth.Provider>




    );
};

export default Authprovider;