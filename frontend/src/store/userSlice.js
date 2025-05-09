import { createSlice } from '@reduxjs/toolkit'
import { loginbythunk, registerbythunk, logoutbythunk, getprofilebythunk, getusersfilebythunk, forgotPassbythunk ,emailverifybythunk} from './userThunk';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAthentication: false,
        userProfile: null,
        screenloading: true,
        users: null,
        selectoruser: null,

    },
    reducers: {
        // define synco function
        setSelectorUser: (state, action) => {
            state.selectoruser = action.payload;
            console.log(action.payload);
            
        },

    },
    extraReducers: (builder) => {

        builder.addCase(loginbythunk.pending, (state, action) => {
            // console.log(action.payload);
        
            state.isAthentication = false;

        })
        builder.addCase(loginbythunk.fulfilled, (state, action) => {
            // state.userProfile = action.payload?.loginUser;
            // console.log(action.payload);
            state.screenloading = false;
            state.isAthentication = true;

        })
        builder.addCase(loginbythunk.rejected, (state, action) => {
            // console.log('rejected');
            state.isAthentication = false;
        })

        // signup data handling

        builder.addCase(registerbythunk.pending, (state, action) => {
            console.log('pending');
            state.isAthentication = false;

        })
        builder.addCase(registerbythunk.fulfilled, (state, action) => {
            // state.userProfile = action.payload?.user;
            console.log(action.payload);
            state.isAthentication = true;
            state.screenloading = false;

        })
        builder.addCase(registerbythunk.rejected, (state, action) => {
            console.log('rejected');
            state.isAthentication = false;
        })

        //logout data handling
        builder.addCase(logoutbythunk.pending, (state, action) => {
            console.log('pending');
            state.screenloading = false;
            state.isAthentication = true;

        })
        builder.addCase(logoutbythunk.fulfilled, (state, action) => {
            state.userProfile = null;
            // console.log(action.payload);
            state.isAthentication = false;
            state.screenloading = true;

        })
        builder.addCase(logoutbythunk.rejected, (state, action) => {
            console.log('rejected');
            state.screenloading = false;
            state.isAthentication = true;
        })

        // get profile data handling
        builder.addCase(getprofilebythunk.pending, (state, action) => {
            console.log('pending');
            state.isAthentication = true;

        })
        builder.addCase(getprofilebythunk.fulfilled, (state, action) => {

            state.screenloading = false;
            state.isAthentication = true;
            // console.log(action.payload);
            state.userProfile = action.payload?.User;
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
            state.users = action.payload?.users;
            // console.log(action.payload?.users);


        })
        builder.addCase(getusersfilebythunk.rejected, (state, action) => {
            console.log('rejected');

        })

        // forgot password 

        builder.addCase(forgotPassbythunk.pending, (state, action) => {
            console.log('pending');


        })
        builder.addCase(forgotPassbythunk.fulfilled, (state, action) => {
            console.log('fulfilled');

        })
        builder.addCase(forgotPassbythunk.rejected, (state, action) => {
            console.log('rejected');

        })

        // email verify 
        builder.addCase(emailverifybythunk.pending, (state, action) => {
            console.log('pending');


        })
        builder.addCase(emailverifybythunk.fulfilled, (state, action) => {
            console.log('fulfilled');

        })
        builder.addCase(emailverifybythunk.rejected, (state, action) => {
            console.log('rejected');

        })
    }
})

// Action creators are generated for each case reducer function
export const { setSelectorUser, extraReducers } = userSlice.actions

export default userSlice.reducer