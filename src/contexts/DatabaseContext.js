import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { firestore as fs, storageBucket as sb } from "../firebase"


const DatabaseContext = createContext()

/**
 * Returns a database context object (returned from `React.useContext`) 
 * containing variables and methods for interacting with the database. 
 * 
 * This context object should be used throughout the application as an API for 
 * database I/O operations. 
 */
export function useDatabaseContext() {
    return useContext(DatabaseContext)
}

/**
 * A context provider component for providing children components with access 
 * to the database.
 */
export function DatabaseContextProvider({ children }) {
    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(false) /** true if waiting for I/O */
    const auth = useAuthContext()

    /**
     * 
     */
    /**
     * Re-populates `userData` with the current user data from the database.
     * 
     * @return {Promise} If the user is not signed in, 
     * the userData field is set to null and
     * null is returned, otherwise returnes a promise resolved if the 
     * refresh was succesfull, and
     */
    const refreshUserdata = useCallback(() => {
        setLoading(true)
        if (auth.currentUser) {
            let q = fs.query(fs.collection(fs.dbRef, "users"),
                             fs.where("id", "==", auth.currentUser.uid))
            return fs.getDocs(q)
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        console.log(doc.data())
                        setUserData(doc.data())
                    })
                })
                .finally(() => setLoading(false))
        } else {
            setUserData(null)
            setLoading(false)   
            return Promise.reject()
        }
    }, [auth.currentUser])

    useEffect(() => {
        refreshUserdata()
            .catch(() => null)
    }, [auth.currentUser, refreshUserdata])

    /**
     * TODO: implement this.
     */
    function updateUserData() {
        throw new Error('updateUserData was not implemented yet.')
    }

    /**
     * Checks whether a username already exists in the database.
     *  
     * @param {string} username The username to be checked.
     * 
     * @return {Promise} A promise resolved with `true` if the username is
     * available, otherwise the promise is rejected.
     */
    function isUsernameAvailable(username) {
        setLoading(true)
        return fs.getDoc(fs.doc(fs.dbRef, `users/${username}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return Promise.reject(new Error('Username not available'))
                } else {
                    return true
                }
            })
            .finally(() => setLoading(false))
    }

    /**
     * Get spots with an optional filtering specification.
     * 
     * @param {object} filter The javascript object containing various filters.
     * 
     * @return {Promise} A promise resolved with an array containing the 
     * matching spots (each spot as a javascript object) or rejected 
     * if no matching spots were found.
     */
    function getSpots(filters = {}) {
        let constraints = []
        for (let key in filters) {
            constraints.push(fs.where(key, "==", filters[key]))
        }
        let q = fs.query(fs.collection(fs.dbRef, "spots"), ...constraints)
        return fs.getDocs(q)
            .then((querySnapshot) => querySnapshot.docs.map(d => d.data()))
    }

    /**
     * Get all spot requests.
     *  
     * Note: images are not included here, use getSpotById to get the images of
     * a certain spot.
     *
     * @return {Promise} A promise resolved with an array containing the 
     * spot requests (each spot as a javascript object) or rejected 
     * if no matching spots were found.
     */
    function getSpotRequests() {
        return fs.getDocs(fs.query(fs.collection(fs.dbRef, "spotRequests"), []))
            .then((querySnapshot) => querySnapshot.docs.map(d => d.data()))
    }
    
    /**
     * TODO: implement this...
     * 
     * Approve spot request (removes the request and makes the spot public).
     *
     * @param {string} id the id of the spot to approve.
     * 
     * @return {Promise} A promise resolved if the approval was succesful.
     */
    // function approveSpotRequest(id) {
    //     return fs.getDoc(fs.doc(fs.dbRef, `spotRequests/${id}`))
    //         .then((snapshot) => {
    //             let sd = snapshot.data()
    //             let { name, info, latitude, longitude, obstacles, hours, imgURLs } = sd
    //             // TODO: add 
    //         })
    // }
    
    /**
     * TODO: implement this...
     * 
     * Remove spot request.
     *
     * @param {string} id the id of the spot to remove.
     * 
     * @return {Promise} A promise resolved if the removal was succesful.
     */
    // function removeSpotRequest(id) {
    //     // implement this...
    // }

    /**
     * Add a new spot. This will add the spot as a request to be approved by an
     * admin, or immediately add the spot if a non-admin user is logged in.
     *  
     * @param {string} name The name of the spot.
     * @param {string} info The description of the spot.
     * @param {number} latitude
     * @param {number} longitude
     * @param {array} obstacles string array containing the spot's obstacles.
     * @param {string} hours string describing the spot's hours of operation.
     * @param {array} imgFiles array of zero or more uploaded image files 
     * ('file' here comes from the Blob or File Javascript API).
     * 
     * @return {Promise} A promise resolved if the add was successful or 
     * rejected if it failed.
     */

    function addSpotWithImages(
        name, info, latitude, longitude, obstacles, hours, imgFiles) {
        let spotData = {
            name: name,
            info: info,
            coordinates: [latitude, longitude],
            obstacles: obstacles,
            hours: hours
        }
        
        let rootDir = userData.role === 'admin' ? 'spots' : 'spots'
        // ^^ change second 'spots' to 'spotsRequest' ^^
        return fs.addDoc(fs.collection(fs.dbRef, rootDir), spotData)
            // add id to spot document
            .then(async doc => {
                await fs.setDoc(doc, { id: doc.id }, { merge: true })
                return doc
            })
            // add images to spot document
            .then(async doc => {
                let imgURLs = []
                for (let imgFile of imgFiles) {
                    let filePath = `${rootDir}/${doc.id}/${imgFile.name}`
                    let storageRef = sb.ref(sb.storage, filePath)
                    await sb.uploadBytes(storageRef, imgFile)
                    let imgURL = await sb.getDownloadURL(storageRef)
                    imgURLs.push(imgURL)
                }
                return fs.setDoc(doc, { imgURLs: imgURLs }, { merge: true })
            })
    }

    /**
     * Gets the data for a spot by its ID.
     *  
     * @param {string} id
     * 
     * @return {Promise} A promise resolved with the json object for the spot,
     * or rejected if the document does not exist.
     */
    function getSpotById(id, withImages = false) {
        return fs.getDoc(fs.doc(fs.dbRef, `spots/${id}`)).then(s => s.data())
    }

    /**
     * Adds a spot's id to the user's list of favorite spots in the database.
     * 
     * @param {string} id
     * 
     * @return {Promise} A promise resolved if the add was successful.
     */
    function addSpotToFavorites(id) {
        if (!userData) return Promise.reject(new Error('No user is signed in.'))
        let userDoc = fs.doc(fs.dbRef, `users/${userData.username}`)
        let currFavorites = userData.favoriteSpots ? userData.favoriteSpots : []
        let updatedFavoriteSpots = [...currFavorites, id]
        return fs.setDoc(userDoc, {
            favoriteSpots: updatedFavoriteSpots
        }, { merge: true })
            .then(() => refreshUserdata())
    }

    /**
     * Adds a spot's id to the user's list of favorite spots in the database.
     *  
     * @param {string} id
     * 
     * @return {Promise} A promise resolved if the removal was successful or if
     * the user did not have that spot in their list of favorite spots.
     */
    function removeSpotFromFavorites(id) {
        let userDoc = fs.doc(fs.dbRef, `users/${userData.username}`)
        if (!userData.favoriteSpots) return Promise.resolve()
        let currFavorites = userData.favoriteSpots
        let updatedFavoriteSpots = currFavorites.filter(favId => favId !== id)
        return fs.setDoc(userDoc, {
            favoriteSpots: updatedFavoriteSpots
        }, { merge: true })
            .then(() => refreshUserdata())
    }

    const value = {
        userData,
        loading,
        updateUserData,
        isUsernameAvailable,
        getSpots,
        getSpotRequests,
        getSpotById,
        addSpotWithImages,
        addSpotToFavorites,
        removeSpotFromFavorites,
    }

    return (
        <DatabaseContext.Provider value={value}>
            {!loading && children}
        </DatabaseContext.Provider>
    )
}
