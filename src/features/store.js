import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user'
import loginReducer from './login'

export const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer
    }
})