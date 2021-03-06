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
    // LOGOUT,
    CLEAR_ERRORS,
    SET_SUBMITTING,
    UPLOAD_ERROR
} from './actions'


const SignupAndAuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('ctoken'),
        isAuthenticated: null,
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
    const login = async (formData) => {
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
                payload: res.data.token
            })
            submitting(false);
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.msg
            })
            submitting(false);
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 10000)
        }

    }


    const uploadPicture = async (picture) => {
        submitting(true);
        if (picture) {
            let formData = new FormData();
            formData.append('profilePicture', picture)
            try {
                await axios.post(`${baseUrl.uri}profile-picture`, formData)
                submitting(false);
                loadUser();
            } catch (err) {
                dispatch({
                    type: UPLOAD_ERROR,
                    payload: {msg:'picture too large, should be 100kb'}
                })
                submitting(false);
                setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 10000)
            }
        }
    }


    return (
        <signUpAndAuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            error: state.error,
            user: state.user,
            signup,
            setSubmitting: state.setSubmitting,
            confirmation: state.confirmation,
            confirmEmail,
            loading: state.loading,
            loadUser,
            login,
            uploadPicture
        }}>
            {props.children}
        </signUpAndAuthContext.Provider>
    )
}

export default SignupAndAuthState