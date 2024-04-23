import {createSlice} from '@reduxjs/toolkit';
import { IUser} from '../types/auth';

type AuthState = {
    user: IUser;
    isAuth: boolean;
    token: string | null;
    error: string | null;
}

const initialState: AuthState = {
    user: {
        _id: '',
        email: '',
        roles: [],
        member: [],
    },
    isAuth: false,
    token: null,
    error: null,
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
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        logOut:(state, action) => {
            state.user = action.payload
            state.token = null;
            state.isAuth = false;
        }
    },
});

export default authSlice.reducer
export const  {setCredentials, setAuth,  logOut} = authSlice.actions;
