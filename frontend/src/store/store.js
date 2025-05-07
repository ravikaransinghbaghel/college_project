import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import massageSlice from './Massageslice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        massage: massageSlice,
    },
})