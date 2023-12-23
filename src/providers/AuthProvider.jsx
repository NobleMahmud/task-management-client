import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';




export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();






const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateUserProfile = (displayName, photoURL) => {
        return updateProfile(auth.currentUser,
            {
                displayName,
                photoURL
            })
    }


    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const [user, setUser] = useState(null);
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false);
            setUser(currentUser);
            console.log('observing', currentUser);
        })
        return () => { unSubscribe(); }
    }, [])
    const authInfo = {
        signUp,
        signIn,
        googleSignIn,
        user,
        logOut,
        loading,
        updateUserProfile,
        setUser,
        createUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider