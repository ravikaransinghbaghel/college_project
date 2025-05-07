import { createSlice } from '@reduxjs/toolkit'
import { loginbythunk, registerbythunk, logoutbythunk, getprofilebythunk, getusersfilebythunk } from './userThunk';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAthentication: false,
        userProfile: null,
        loading: false,
        screenloading: true,
        users: null,
        selectoruser: null,
    
    },
    reducers: {
        // define synco function
        setSelectorUser: (state, action) => {
            state.selectoruser = action.payload;
        },

    },
    extraReducers: (builder) => {

        builder.addCase(loginbythunk.pending, (state, action) => {
            // console.log(action.payload);
            state.userProfile = action.payload?.user;
            state.loading = true;
            state.isAthentication = false;

        })
        builder.addCase(loginbythunk.fulfilled, (state, action) => {
            state.userProfile = action.payload?.user;
            state.loading = false;
            state.isAthentication = true;

        })
        builder.addCase(loginbythunk.rejected, (state, action) => {
            // console.log('rejected');
            state.loading = false;
            state.isAthentication = false;
        })

        // signup data handling

        builder.addCase(registerbythunk.pending, (state, action) => {
            console.log('pending');
            state.userProfile = action.payload?.user;
            state.loading = true;
            state.isAthentication = false;

        })
        builder.addCase(registerbythunk.fulfilled, (state, action) => {
            state.userProfile = action.payload?.user;
            // console.log(action.payload);
            state.isAthentication = true;
            state.loading = false;

        })
        builder.addCase(registerbythunk.rejected, (state, action) => {
            console.log('rejected');
            state.loading = false;
            state.isAthentication = false;
        })

        //logout data handling
        builder.addCase(logoutbythunk.pending, (state, action) => {
            console.log('pending');
            state.loading = false;
            state.isAthentication = true;

        })
        builder.addCase(logoutbythunk.fulfilled, (state, action) => {
            state.userProfile = null;
            // console.log(action.payload);
            state.isAthentication = false;
            state.loading = true;

        })
        builder.addCase(logoutbythunk.rejected, (state, action) => {
            console.log('rejected');
            state.loading = false;
            state.isAthentication = true;
        })

        // get profile data handling
        builder.addCase(getprofilebythunk.pending, (state, action) => {
            console.log('pending');
            state.userProfile = action.payload?.user;
            state.isAthentication = true;

        })
        builder.addCase(getprofilebythunk.fulfilled, (state, action) => {

            state.screenloading = false;
            state.isAthentication = true;
            // console.log(action.payload);
            state.userProfile = action.payload?.user;
            // console.log(state.userProfile);

        })
        builder.addCase(getprofilebythunk.rejected, (state, action) => {
            console.log('rejected');
            state.screenloading = false;
            state.isAthentication = false;
        })


        // get users data handling
        builder.addCase(getusersfilebythunk.pending, (state, action) => {
            console.log('pending');


        })
        builder.addCase(getusersfilebythunk.fulfilled, (state, action) => {
            console.log('fulfilled');
            state.users = action.payload?.user;
            // console.log(action.payload?.user);


        })
        builder.addCase(getusersfilebythunk.rejected, (state, action) => {
            console.log('rejected');

        })

    }
})

// Action creators are generated for each case reducer function
export const { setSelectorUser, extraReducers } = userSlice.actions

export default userSlice.reducer