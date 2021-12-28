import React, { createContext, useContext, useState } from "react"

export const ModalContext = createContext()

export function useModalContext() {
    return useContext(ModalContext)
}

export function ModalProvider({children}){
    const [idNumber, setIdNumber] = useState(null)
    const [infoModalToggle, setInfoModalToggle] = useState(false);
    const [signinWindow, setSigninWindow] = useState(false);
    const [signupWindow, setSignupWindow] = useState(false);
    const [ForgotPasswordWindow, setForgotPasswordWindow] = useState(false)
    const [menuToggle, setMenuToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);

    const value = {
        infoModalToggle, setInfoModalToggle,
        idNumber, setIdNumber,
        signinWindow, setSigninWindow,
        signupWindow, setSignupWindow,
        ForgotPasswordWindow, setForgotPasswordWindow,
        menuToggle, setMenuToggle,
        profileToggle, setProfileToggle
    }

    return(
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}