/* eslint-disable import/no-anonymous-default-export */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import api from './middleware/api';
import reducer from './reducer';

export default function () {
    return configureStore({
      reducer,
      middleware: [
        ...getDefaultMiddleware(),
        api,
      ],
    });
  }