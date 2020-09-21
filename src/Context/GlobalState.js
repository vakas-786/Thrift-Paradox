import axios from 'axios'
import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState = {
    transactions: []
}


export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    

    return (<GlobalContext.Provider value ={{
        }}>
        {children}
    </GlobalContext.Provider>)
}