import {createSlice, AnyAction} from '@reduxjs/toolkit';
import { IUser} from '../types/auth';

type AuthState = {
    user: IUser;
    token: string | null;
    error: string | null;
    success: boolean;
    loading:boolean;
}

const initialState: AuthState = {
    user: {
        _id: '',
        email: '',
        roles: [],
        member: [],
    },
    token: null,
    error: null,
    success: false,
    loading: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials:(state, action) => {
            const {user, token} = action.payload
            state.user = user;
            state.token = token;
        },
        logOut:(state, action) => {
            state.user = action.payload
            state.token = null;
        }
    },
});

export default authSlice.reducer
export const  {setCredentials, logOut} = authSlice.actions;

const isError = (action:AnyAction) => {
    return action.type.endsWith('rejected')
}