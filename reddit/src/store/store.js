import { configureStore, combineReducers } from '@reduxjs/toolkit';
import homeReducer from './homeSlice';
import subredditReducer from './subredditsSlice'

export default configureStore({
    reducer: combineReducers({
        reddit: homeReducer,
        subreddit: subredditReducer,
    })
})