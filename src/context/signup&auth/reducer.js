import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CONFIRMATION,
    CONFIRMATION_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    // LOGOUT,
    CLEAR_ERRORS,
    SET_SUBMITTING,
    UPLOAD_ERROR
} from './actions'

const signUpAndAuthReducer = (state, action) => {
    switch (action.type) {
        case SET_SUBMITTING:
            return {
                ...state,
                setSubmitting: action.payload
            }
        case UPLOAD_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTER_FAIL:
        case CONFIRMATION_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('ctoken')
            return {
                ...state,
                error: action.payload,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case CONFIRMATION:
            return {
                ...state,
                confirmation: action.payload

            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('ctoken', action.payload)
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        default:
            return state
    }
}

export default signUpAndAuthReducer
