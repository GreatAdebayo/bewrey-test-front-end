import React, { useContext } from 'react'
import {  Navigate } from "react-router-dom";
import signUpAndAuthContext from '../context/signup&auth/context'

const PrivateRoute = ({ children }) => {
    const { isAutheticated, loading } = useContext(signUpAndAuthContext)
    return (
          
        isAutheticated && !loading  ? children : <Navigate to="/Login" />


    )
}

export default PrivateRoute
