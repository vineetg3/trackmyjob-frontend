import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
    name:"userJobs",
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
            state.list = action.payload;
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

export const getQueriedJobs = (query,url)=>{
    apiCallBegan({
        url,
        method:'get',
        data: query,
        onSuccess:userJobsReceived.type
    })
}