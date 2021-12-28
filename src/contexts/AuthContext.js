import React, { createContext, useContext, useState, useEffect } from "react"
import { appAuth, firebaseAuth, firestore as fs } from "../firebase"

const AuthContext = createContext()

export function useAuthContext() {
    return useContext(AuthContext)
}

export function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signUp(email, password, username, role=null) {
        let userDoc = fs.doc(fs.dbRef, `users/${username}`)
        return fs.getDoc(userDoc)
            .then(snapShot => {
                if (snapShot.exists()) {
                    throw new Error('Username not available')
                }
                
                return appAuth.createUserWithEmailAndPassword(email, password)
            })
            .then(({ user }) => {
                let userData = {
                    username: username,
                    id: user.uid,
                    favoriteSpots: []
                }
                if (role) userData.role = role
                return fs.setDoc(userDoc, userData)
            })
    }

    function signIn(email, password) {
        return appAuth.signInWithEmailAndPassword(email, password)
    }

    function signOut() {
        return appAuth.signOut()
    }

    function resetPassword(email) {
        return appAuth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function reauthenticate(email, password) {
        let credential = firebaseAuth.EmailAuthProvider.credential(email, password)
        return currentUser.reauthenticateWithCredential(credential)
    }

    useEffect(() => {
        const unsubscribe = appAuth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateEmail,
        updatePassword,
        reauthenticate
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
