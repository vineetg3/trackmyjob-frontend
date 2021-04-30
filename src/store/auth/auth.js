import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"auth",
    initialState: {
        user:{
            id:null,
            username:null,
            email:null,
        },
        isLoggedIn:false,
        loading:false,
        signedUp:false,
    },
    reducers:{
        //event - event handler
        authRequested: (state,action)=>{
            state.loading = true
        },
        authRequestFailed : (state,action)=>{
            state.loading = false;
        },
        authLoggedIn: (state,action)=>{
            //get
            const {id,username,email} = action.payload.user;
            state.user.id=id;
            state.user.username=username;
            state.user.email=email;
            state.isLoggedIn=true;
        },
        authLoggedOut:(state,action)=>{
            state.isLoggedIn=false;
        },
        authSignedUp:(state,action) => {
            //post
            state.signedUp=true;
        },

    }
});

export default slice.reducer;
