import { createSlice } from '@reduxjs/toolkit'
import { sendMassageThunk, getMassageThunk } from './MassageTHunk'

export const massageSlice = createSlice({
    name: 'massage',
    initialState: {
        massageState: [],
        chackMassage:''
    },
    reducers: {


    },
    extraReducers: (builder) => {

        builder.addCase(sendMassageThunk.pending, (state, action) => {
            console.log('pending');
        });

        builder.addCase(sendMassageThunk.fulfilled, (state, action) => {
            console.log('send massage fulfilled');
            // console.log(action.payload);

            // state.massageState = [...state.massageState, action.payload.massages];
            // // state.massageState = action.payload.massages;
            // console.log(state.massageState);

        });

        builder.addCase(sendMassageThunk.rejected, (state, action) => {
            console.log('rejected');
        });


        // get massage 


        builder.addCase(getMassageThunk.pending, (state, action) => {
            // console.log('pending');


        })
        builder.addCase(getMassageThunk.fulfilled, (state, action) => {
            // console.log('fulfilled');
            state.chackMassage=action.payload?.massages;
            // console.log(state.chackMassage);

            if (Array.isArray(action.payload?.massages?.massages) && action.payload?.massages?.massages.length > 0) {

                state.massageState = action.payload.massages?.massages;
                // console.log(state.massageState);
            }

        })
        builder.addCase(getMassageThunk.rejected, (state, action) => {
            console.log('rejected');

        })

    }
})

// Action creators are generated for each case reducer function
export const { extraReducers } = massageSlice.actions

export default massageSlice.reducer