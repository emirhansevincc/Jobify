import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from './actions';

const reducer = (state, action) => {
    if(action.type === DISPLAY_ALERT) {
        return { ...state, showAlert: true, alertText: 'Please provide all values!', alertType: 'danger' };
    }
    if(action.type === CLEAR_ALERT) {
        return { ...state, showAlert: false, alertText: '', alertType: '' };
    }
    if(action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true };
    }
    if(action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token : action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertText: 'User registered successfully!',
            alertType: 'success',
        }
    }
    if(action.type === REGISTER_USER_ERROR) {
        return { 
            ...state, 
            isLoading: false, 
            showAlert: true, 
            alertText: action.payload.msg, 
            alertType: 'danger' 
        };
    }
    if(action.type === LOGIN_USER_BEGIN) {
        return { ...state, isLoading: true };
    }
    if(action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token : action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertText: 'Login successful! Welcome back!',
            alertType: 'success',
        }
    }
    if(action.type === LOGIN_USER_ERROR) {
        return { 
            ...state, 
            isLoading: false, 
            showAlert: true, 
            alertText: action.payload.msg, 
            alertType: 'danger' 
        };
    }
    throw new Error(`Unhandled action type: ${action.type}`);
}

export default reducer;