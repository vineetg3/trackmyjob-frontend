import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";
import { queryUserJobsEndpoint, userJobEndpoint } from "../apiEndpoints";

const slice = createSlice({
    name:"userJobs", //this name doesnt decide store variables
    initialState: {
        list:[],
        loading:false,
        error: {
            statusCode:null,
            isError:false,
            message: null,
        }
    },
    reducers:{
        //event - event handler
        userJobsRequested: (state,action)=>{
            state.loading = true
            state.error.isError=false;
            state.error.message=null;
            state.error.statusCode=null;

        },
        userJobsRequestFailed : (state,action)=>{
            state.loading = false;
            state.error.isError=true;
            state.error.message=action.payload.data.message;
            state.error.statusCode=action.payload.statusCode;

        },
        setError:(state,action)=>{
            state.error.isError=action.payload.isError;
            state.error.message=action.payload.message;
        },
        userJobsReceived: (state,action)=>{
            //get
            state.list = action.payload.userJobs;
            state.loading = false;
            state.error.isError=false;
            state.error.message=null;
            state.error.statusCode=null;

        },
        userJobsAdded:(state,action) => {
            //post
            state.loading = false;
            state.error.isError=false;
            state.error.message=null;
            state.error.statusCode=null;
            state.list.push(action.payload);
        },
        userJobRemoved: ( state,action)=>{
            //Delete
            state.loading = false;
            state.error.isError=false;
            state.error.message=null;
            state.error.statusCode=null;
            let idx = state.list.findIndex(userJob => userJob.userJob_id === action.payload.userJob_id);
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
    userJobRemoved,
    userJobsModified,
    userJobsRequested,
    userJobsRequestFailed,
} = slice.actions

export default slice.reducer;

export const getQueriedJobs = (query)=>
    apiCallBegan({
        url:queryUserJobsEndpoint,
        method:'post',
        data: query,
        onStart:userJobsRequested.type,
        onSuccess:userJobsReceived.type,
        onError:userJobsRequestFailed.type,
    })

export const deleteJob = (id) => 
    apiCallBegan(
        {
            url:userJobEndpoint+`/${id}`,
            method:'delete',
            onSuccess:userJobRemoved.type,
        }
    )
