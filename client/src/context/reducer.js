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
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state, showAlert: true, alertText: 'Please provide all values!', alertType: 'danger' };
    }
    if (action.type === CLEAR_ALERT) {
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


    if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertText: action.payload.alertText,
            alertType: 'success',
        }
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        };
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar
        };
    }
    if (action.type === LOGOUT_USER) {
        return {
            // We imported initialState from appContext.js not state.action because we want to reset the state to its initial state 
            ...initialState,
            token: null,
            user: null,
            userLocation: null,
            jobLocation: null,
        }
    }

    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }

    if (action.type === HANDLE_CHANGE) {
        const { name, value } = action.payload;
        return { ...state, [name]: value };
    }
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending',
        }
        return { ...state, ...initialState };
    }
    if (action.type === CREATE_JOB_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === CREATE_JOB_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'New Job Created!',
        };
    }
    if (action.type === CREATE_JOB_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
    }

    if (action.type === GET_JOBS_BEGIN) {
        // We hide the alert when because when you get some error and then you try to get jobs again, the alert will still be there and we don't want that.
        return { ...state, isLoading: true, showAlert: false };
    }
    if (action.type === GET_JOBS_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          jobs: action.payload.jobs,
          totalJobs: action.payload.totalJobs,
          numOfPages: action.payload.numOfPages,
        };
    }

    throw new Error(`No Matching "${action.type}" - action type`);
}

export default reducer;