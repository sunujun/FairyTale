import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    pw: '',
    isNew: true,
};
const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setSignUp(state, action) {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.pw = action.payload.pw;
        },
        setName(state, action) {
            state.name = action.payload.name;
        },
        setEmail(state, action) {
            state.email = action.payload.email;
        },
        setPw(state, action) {
            state.pw = action.payload.pw;
        },
    },
});

export default signUpSlice;
