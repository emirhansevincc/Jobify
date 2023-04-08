import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    // REGISTER_USER_BEGIN,
    // REGISTER_USER_SUCCESS,
    // REGISTER_USER_ERROR,
    // LOGIN_USER_BEGIN,
    // LOGIN_USER_SUCCESS,
    // LOGIN_USER_ERROR,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
    if(action.type === DISPLAY_ALERT) {
        return { ...state, showAlert: true, alertText: 'Please provide all values!', alertType: 'danger' };
    }
    if(action.type === CLEAR_ALERT) {
        return { ...state, showAlert: false, alertText: '', alertType: '' };
    }

    // if(action.type === REGISTER_USER_BEGIN) {
    //     return { ...state, isLoading: true };
    // }
    // if(action.type === REGISTER_USER_SUCCESS) {
    //     return {
    //         ...state,
    //         isLoading: false,
    //         token : action.payload.token,
    //         user: action.payload.user,
    //         userLocation: action.payload.location,
    //         jobLocation: action.payload.location,
    //         showAlert: true,
    //         alertText: 'User registered successfully!',
    //         alertType: 'success',
    //     }
    // }
    // if(action.type === REGISTER_USER_ERROR) {
    //     return { 
    //         ...state, 
    //         isLoading: false, 
    //         showAlert: true, 
    //         alertText: action.payload.msg, 
    //         alertType: 'danger' 
    //     };
    // }
    // if(action.type === LOGIN_USER_BEGIN) {
    //     return { ...state, isLoading: true };
    // }
    // if(action.type === LOGIN_USER_SUCCESS) {
    //     return {
    //         ...state,
    //         isLoading: false,
    //         token : action.payload.token,
    //         user: action.payload.user,
    //         userLocation: action.payload.location,
    //         jobLocation: action.payload.location,
    //         showAlert: true,
    //         alertText: 'Login successful! Welcome back!',
    //         alertType: 'success',
    //     }
    // }
    // if(action.type === LOGIN_USER_ERROR) {
    //     return { 
    //         ...state, 
    //         isLoading: false, 
    //         showAlert: true, 
    //         alertText: action.payload.msg, 
    //         alertType: 'danger' 
    //     };
    // }


    if(action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true };
    }
    if(action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token : action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertText: action.payload.alertText,
            alertType: 'success',
        }
    }
    if(action.type === SETUP_USER_ERROR) {
        return { 
            ...state, 
            isLoading: false, 
            showAlert: true, 
            alertText: action.payload.msg, 
            alertType: 'danger' 
        };
    }

    if(action.type === TOGGLE_SIDEBAR) {
        return { 
            ...state,
            showSidebar: !state.showSidebar
        };
    }
    if(action.type === LOGOUT_USER) {
        return {
            // We imported initialState from appContext.js not state.action because we want to reset the state to its initial state 
            ...initialState,
            token: null,
            user: null,
            userLocation: null,
            jobLocation: null,
        }
    }

    throw new Error(`Unhandled action type: ${action.type}`);
}

export default reducer;