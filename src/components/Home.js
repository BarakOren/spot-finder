import React, { useEffect } from 'react'
import NavItem from "./NavItem";
import { motion } from "framer-motion";
import { useAuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Home() {

    const { currentUser } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) {
            // Already signed in, so navigate to spots page
            navigate("/spots", { replace: true })
        }
    }, [])

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="d-grid gap-1">
                <motion.div
                    animate={{ x: [-100, 0], opacity: [0, 1] }}
                    transition={{ duration: 0.5, ease: "linear" }}
                    >
                    <h1 className="text-center" style={{fontSize:'25pt', width: '200px'}}>SpotFinder</h1>
                </motion.div>
                <motion.div
                    animate={{ opacity: [0, 0, 1] }}
                    transition={{ duration: 0.5, ease: "linear" }}
                >
                    <div className="row text-center">
                        <div className="col"><NavItem to="/sign-in" name="Sign In" /></div>
                        <div className="col"><NavItem to="/sign-up" name="Sign Up" /></div>
                    </div>
                    <div className="row text-center">
                        <div className="col"><NavItem to="/spots" name="Continue as Guest" /></div>
                    </div>
                </motion.div>
          
            </div>
        </div>
    )
}
