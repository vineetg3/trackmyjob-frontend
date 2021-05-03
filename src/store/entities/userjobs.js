import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";
import { queryUserJobsEndpoint } from "../apiEndpoints";

const slice = createSlice({
    name:"userJobs", //this name doesnt decide store variables
    initialState: {
        list:[],
        loading:false,
    },
    reducers:{
        //event - event handler
        userJobsRequested: (state,action)=>{
            state.loading = true
        },
        userJobsRequestFailed : (state,action)=>{
            state.loading = false;
        },
        userJobsReceived: (state,action)=>{
            //get
            state.list = action.payload.userJobs;
            state.loading = false;

        },
        userJobsAdded:(state,action) => {
            //post
            state.list.push(action.payload);
        },
        userJobsRemoved: ( state,action)=>{
            //Delete
            let idx = state.list.findIndex(userJob => userJob.id === action.payload.id);
            state.list.splice(idx,1);
       },
       userJobsModified:(state,action)=>{
           //Put request
            let idx = state.list.findIndex(userJob => userJob.id === action.payload.id);
            state.list[idx]=action.payload;
       }
    }
});


const {
    userJobsReceived,
    userJobsAdded,
    userJobsRemoved,
    userJobsModified,
    userJobsRequested,
    userJobsRequestFailed,
} = slice.actions

export default slice.reducer;

export const getQueriedJobs = (query)=>
    apiCallBegan({
        url:queryUserJobsEndpoint,
        method:'get',
        data: query,
        onSuccess:userJobsReceived.type
    })
