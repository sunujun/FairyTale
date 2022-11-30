import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    pw: '',
    isNew: false,
};
const signInSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setSignIn(state, action) {
            state.email = action.payload.email;
            state.pw = action.payload.pw;
        },
        setEmail(state, action) {
            state.email = action.payload.email;
        },
        setPw(state, action) {
            state.pw = action.payload.pw;
        },
    },
});

export default signInSlice;
