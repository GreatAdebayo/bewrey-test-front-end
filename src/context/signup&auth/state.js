import React, { useReducer } from 'react'
import signUpAndAuthContext from './context'
import signUpAndAuthReducer from './reducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import baseUrl from '../../utils/baseUrl'


import {
    REGISTER_SUCCESS,
    CONFIRMATION,
    CONFIRMATION_FAIL,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SET_SUBMITTING
} from './actions'


const SignupAndAuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('ctoken'),
        isAutheticated: null,
        confirmation: null,
        error: null,
        user: null,
        setSubmitting: false,
        registration_success: null,
        loading: true
    }
    const [state, dispatch] = useReducer(signUpAndAuthReducer, initialState)




    //Set Submitting 
    const submitting = (payload) => {
        dispatch(
            {
                type: SET_SUBMITTING,
                payload
            }
        )
    }
    

    //Register Users
    const signup = async formData => {
        submitting(true);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`${baseUrl.uri}signup`, formData, config);
            submitting(false);
            dispatch({
                type: CONFIRMATION,
                payload: res.data.email
            })
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
            submitting(false);
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 10000)
        }

    }

    //Email Confirmation
    const confirmEmail = async formData => {
        submitting(true);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`${baseUrl.uri}confirmation`, formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.token
            })
            submitting(false);
            loadUser();
        } catch (err) {
            submitting(false);
            dispatch({
                type: CONFIRMATION_FAIL,
                payload: err.response.data
            })
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 10000)
        }
    }


    //Load Users
    const loadUser = async () => {
        if (localStorage.ctoken) {
            setAuthToken(localStorage.ctoken)
        }
        try {
            const res = await axios.get(`${baseUrl.uri}auth`);
            console.log(res)
            dispatch({
                type: USER_LOADED,
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.msg
            })

        }
    }

    //Login Users
    const login = async formData => {
        submitting(true);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`${baseUrl.uri}auth`, formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser();
            submitting(false);
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            })
            submitting(false);
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 10000)
        }

    }


    return (
        <signUpAndAuthContext.Provider value={{
            token: state.token,
            isAutheticated: state.isAutheticated,
            error: state.error,
            user: state.user,
            signup,
            setSubmitting: state.setSubmitting,
            confirmation: state.confirmation,
            confirmEmail,
            loading: state.loading,
            loadUser,
            login
        }}>
            {props.children}
        </signUpAndAuthContext.Provider>
    )
}

export default SignupAndAuthState