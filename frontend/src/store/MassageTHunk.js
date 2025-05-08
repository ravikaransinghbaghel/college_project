import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from '../components/utilise'

export const sendMassageThunk = createAsyncThunk('massage/send', async ({ massage, recieverId }, { rejectWithValue }) => {

    try {
        const response = await api.post(`/message/send/${recieverId}`,
            { massage: massage },

        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        return rejectWithValue(error.response.data);
    }
});

export const getMassageThunk = createAsyncThunk('massage/get', async ({ recieverId }, { rejectWithValue }) => {

    try {
        const response = await api.get(`/message/get/${recieverId}`, {});
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        return rejectWithValue(error.response.data);
    }
});


