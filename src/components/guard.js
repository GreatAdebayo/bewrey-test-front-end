import React, { useContext } from 'react'
import {  Navigate } from "react-router-dom";
import signUpAndAuthContext from '../context/signup&auth/context'

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(signUpAndAuthContext)
    return (
          
        !isAuthenticated && !loading  ?  <Navigate to="/Login" /> : children 

    )
}

export default PrivateRoute
