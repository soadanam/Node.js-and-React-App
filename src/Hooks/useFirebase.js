import React, { useEffect, useState } from 'react';
import { firebaseInitializer } from '../firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";


firebaseInitializer();
const provider = new GoogleAuthProvider();



const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    // Google SignIn
    const googleSignIn = () => {
        const auth = getAuth();
        return signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Successful!")
                const myUser = result.user;
                setUser(myUser);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            })
    };

    // SignOut ALL
    const signOutAll = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log('Sign-out successful!')
                setUser('');
            })
            .catch((error) => {
                const signOutError = error.message;
                setError(signOutError);
            })
    };




    //Observer
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser('');
            };
            setIsLoading(false);
        });

    }, [])


    return {
        user,
        googleSignIn,
        signOutAll,
        isLoading,
        error,
    };
};

export default useFirebase;