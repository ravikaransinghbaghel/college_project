import { createSlice } from '@reduxjs/toolkit'
import { sendMassageThunk, getMassageThunk } from './MassageTHunk'

export const massageSlice = createSlice({
    name: 'massage',
    initialState: {
        massageState: null,
    },
    reducers: {
        // define synco function


    },
    extraReducers: (builder) => {

        builder.addCase(sendMassageThunk.pending, (state, action) => {
            console.log('pending');
          });
          
          builder.addCase(sendMassageThunk.fulfilled, (state, action) => {
            console.log('fulfilled');
            console.log(action.payload?.massages);
          
            // Assuming action.payload.massages is an array
            if (action.payload?.massages && action.payload.massages.length > 0) {
              // Add the new message(s) to the state
              state.massageState = [...state.massageState, ...action.payload.massages];
              console.log(state.massageState); // Log to confirm
            }
          });
          
          builder.addCase(sendMassageThunk.rejected, (state, action) => {
            console.log('rejected');
          });
          

        // get massage 


        builder.addCase(getMassageThunk.pending, (state, action) => {
            console.log('pending');


        })
        builder.addCase(getMassageThunk.fulfilled, (state, action) => {
            console.log('fulfilled');
            state.massageState = action.payload?.massage;
            // console.log(action.payload?.massage);


        })
        builder.addCase(getMassageThunk.rejected, (state, action) => {
            console.log('rejected');

        })

    }
})

// Action creators are generated for each case reducer function
export const { extraReducers } = massageSlice.actions

export default massageSlice.reducer