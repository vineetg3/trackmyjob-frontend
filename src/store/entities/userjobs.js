import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";
import { queryUserJobsEndpoint, userJobEndpoint,addUserJobEndpoint } from "../apiEndpoints";

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
        userJobAdded:(state,action) => {
            //post
            state.loading = false;
            state.error.isError=false;
            state.error.message=null;
            state.error.statusCode=null;
            state.list.unshift(action.payload.userJob);
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
       userJobModified:(state,action)=>{
           //Put request
           state.loading = false;
            state.error.isError=false;
            state.error.message=null;
            state.error.statusCode=null;
            let idx = state.list.findIndex(userJob => userJob.userJob_id === action.payload.userJob.userJob_id);
            state.list[idx]=action.payload.userJob;
       }
    }
});


const {
    userJobsReceived,
    userJobAdded,
    userJobRemoved,
    userJobModified,
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
            //add on error later
        }
    )

export const addJob = (data)=>
    apiCallBegan(
        {
            url:addUserJobEndpoint,
            method:'post',
            data,
            onStart:userJobsRequested.type,
            onSuccess:userJobAdded.type,
            onError:userJobsRequestFailed.type
        }
    )

    export const editJob = (data,id)=>
    apiCallBegan(
        {
            url:userJobEndpoint+`/${id}`,
            method:'put',
            data,
            onStart:userJobsRequested.type,
            onSuccess:userJobModified.type,
            onError:userJobsRequestFailed.type
        }
    )
