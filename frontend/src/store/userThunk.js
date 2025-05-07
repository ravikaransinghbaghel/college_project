import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from '../components/utilise'

export const loginbythunk = createAsyncThunk('users/login', async ({ username, password }, { rejectWithValue }) => {

    try {
        const response = await api.post('/login', {
            username,
            password
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        return rejectWithValue(error.response.data);
    }
});

export const registerbythunk = createAsyncThunk('users/signup', async ({ username, password, gender, fullname, email }, { rejectWithValue }) => {

    try {
        const response = await api.post('/register', {
            username,
            fullname,
            gender,
            password,
            email
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        return rejectWithValue(error.response.data);
    }
});

export const emailverifybythunk = createAsyncThunk('users/verify', async ({emailOtp }, { rejectWithValue }) => {

    try {
        const response = await api.post('/isemailverufy', {
            emailOtp
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        return rejectWithValue(error.response.data);
    }
});

export const forgotPassbythunk = createAsyncThunk('users/forgot', async ({ email }, { rejectWithValue }) => {

    try {
        const response = await api.post('/forgot', {
            email
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        return rejectWithValue(error.response.data);
    }
});

export const logoutbythunk = createAsyncThunk(
    'user/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post('/logout'); // ✅ logout endpoint hona chahiye
            return response.data;
        } catch (error) {
            console.error('Logout error:', error);
            return rejectWithValue(error.response?.data || "Logout failed");
        }
    }
);

export const getprofilebythunk = createAsyncThunk(
    'user/getprofile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/get-profile');
            return response.data;
        } catch (error) {
            console.error('Profile fetch error:', error);
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }
);

export const getusersfilebythunk = createAsyncThunk(
    'user/getusers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            console.error('Profile fetch error:', error);
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }
);

