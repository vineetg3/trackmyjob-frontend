import axios from 'axios';
import * as actions from "../apiActions.js";
import configData from "../../config.json";

const api = store => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);


    const { url, method, data, onSuccess, onError, onStart } = action.payload;

    if (onStart)//for changing loading bool
        store.dispatch({ type: onStart });

    next(action); //apiCallBegan

    try {
        var token = localStorage.getItem('accessTokenTrackMyJob');
        const response = await axios.request({
            baseURL: configData.SERVER_BASE_URL,
            url,
            method,
            data,
            headers: { Authorization: 'Bearer ' + token },
        });
        //authentication'
        if (response.data.access_token)
            localStorage.setItem('accessTokenTrackMyJob', response.data.access_token)


        //general
        store.dispatch(actions.apiCallSuccess(response.data)); //redux debugging purposes on redux toolkit
        //specific
        if (onSuccess)
            store.dispatch({ type: onSuccess, payload: response.data });
        //  store.dispatch will actually travel the whole middleware chain again, including the current middleware
    } catch (error) {

        let errorData =
        {
            data: null,
            statusCode:null,
        }
        if (error.response) {
            console.log(error);
            errorData =
            {
                data: error.response.data,
                statusCode: error.response.status,
            }
        } else {
            errorData =
            {
                data: {message:"Network Error"},
                statusCode: 102,
            }
        }


        //general error
        store.dispatch(actions.apiCallFailed(errorData)); //redux debugging purposes on redux toolkit

        //specific 
        if (onError)
            store.dispatch({ type: onError, payload: errorData })
    }
};

export default api;