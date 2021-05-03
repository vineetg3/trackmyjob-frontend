import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";
import {loginEndpoint, logoutEndpoint, registerEndpoint} from "../apiEndpoints.js"
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
            statusCode:null,
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
            state.error.message=action.payload.data.message;
            state.error.statusCode=action.payload.statusCode;
            state.loading = false;
        },
        setError:(state,action)=>{
            state.error.isError=action.payload.isError;
            state.error.message=action.payload.message;
        },
        authLoggedIn: (state,action)=>{
            //get
            const {id,username,email} = action.payload;
            state.user.id=id;
            state.user.username=username;
            state.user.email=email;
            state.isLoggedIn=true;
            state.loading = false;
        },
        authLoggedOut:(state,action)=>{
            state.user.id=null;
            state.user.username=null;
            state.user.email=null;
            state.isLoggedIn=false;
            state.loading = false;

        },
        authSignedUp:(state,action) => {
            //post
            state.signedUp=true;
            state.loading=false;
        },
        setSignedUpBool: (state,action) =>{
            state.signedUp=action.payload.isSignedUp;
        }

    }
});


const {
    authRequested,
    authRequestFailed,
    authLoggedIn,
    authLoggedOut,
    authSignedUp,
    setError,
    setSignedUpBool,
} = slice.actions;

export default slice.reducer;
export {setError,setSignedUpBool};
export const signUpUser = (data) => 
    apiCallBegan({
        method : 'post',
        url:registerEndpoint,
        data,
        onSuccess: authSignedUp.type,
        onError: authRequestFailed.type,
        onStart: authRequested.type,
    });

export const loginUser = (data) =>
    apiCallBegan({
        method:'post',
        url:loginEndpoint,
        data,
        onSuccess:authLoggedIn.type,
        onError:authRequestFailed.type,
        onStart:authRequested.type,
    })

export const authClearError = ()=>
    setError({
        isError:false,
        statusCode:null,
    })

export const logOutUser = ()=>
    apiCallBegan({
        method:'post',
        url:logoutEndpoint,
        onStart:authRequested.type,
        onError:authLoggedOut.type,
        onSuccess:authLoggedOut.type,
    })
