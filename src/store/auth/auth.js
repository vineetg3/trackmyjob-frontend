import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

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
        error: {
            isError:false,
            message: null,
        }
    },
    reducers:{
        //event - event handler
        authRequested: (state,action)=>{
            state.error.isError=false;
            state.loading = true;
        },
        authRequestFailed : (state,action)=>{
            state.error.isError=true;
            state.error.message=action.payload.message;
            state.loading = false;
        },
        authLoggedIn: (state,action)=>{
            //get
            const {id,username,email} = action.payload.user;
            state.user.id=id;
            state.user.username=username;
            state.user.email=email;
            state.isLoggedIn=true;
            state.loading = false;
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


const {
    authRequested,
    authRequestFailed,
    authLoggedIn,
    authLoggedOut,
    authSignedUp,
} = slice.actions;

export default slice.reducer;

export const signUpUser = (data) => 
    apiCallBegan({
        method : 'post',
        data,
        onSuccess: authLoggedIn.type,
        onError: authRequestFailed.type,
        onStart: authRequested.type,
    });
