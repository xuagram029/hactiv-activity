import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null
}

export const loginSlice = createSlice({ 
    name: 'loginUser',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.currentUser = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state = initialState
        }
        
    }
})

export const { loginSuccess, loginFailure, logout } = loginSlice.actions
export default loginSlice.reducer