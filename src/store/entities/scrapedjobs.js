import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"Jobs",
    initialState: {
        list:[],
        loading:false,
    },
    reducers:{
        //event - event handler
        jobsRequested: (state,action)=>{
            state.loading = true
        },
        jobsReceived: (state,action)=>{
            state.list = action.payload;
            state.loading = false;

        },
        jobsRequestFailed : (state,action)=>{
            state.loading = false;
        }, 
    }
});