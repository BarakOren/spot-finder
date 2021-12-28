import React, { createContext, useContext, useState } from "react"

export const SpotsContext = createContext()

export function useSpotsContext() {
    return useContext(SpotsContext)
}

export function SpotsContextProvider({children}){

    const [spots, setSpots] = useState(null)

    const value = {
        spots, setSpots
    }

    return(
        <SpotsContext.Provider value={value}>
            {children}
        </SpotsContext.Provider>
    )
}