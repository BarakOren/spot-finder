import React, { createContext, useContext, useState } from "react"

export const NavigationContext = createContext()

export function useNavigationContext() {
    return useContext(NavigationContext)
}

export function NavigationContextProvider({children}){

    const [currentLatitude, setCurrentLatitude] = useState(null) 
    const [currentLongitude, setCurrentLongitude] = useState(null)
    const [navType, setNavType] = useState("driving")
    const [navigationData, setNavigationData] = useState(null)
    const [navTo, setNavTo] = useState(null)
    const [routeError, setRouteError] = useState(null)
    const [sendUser, setSendUser] = useState(null)

    const value = {
        currentLatitude, setCurrentLatitude,
        currentLongitude, setCurrentLongitude,
        navType, setNavType,
        navigationData, setNavigationData,
        navTo, setNavTo,
        routeError, setRouteError,
        sendUser, setSendUser
    }

    return(
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    )
}