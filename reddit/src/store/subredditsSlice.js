import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../api/reddit";

const initialState = {
    subreddits: [],
    isLoading: false,
    error: false,
};

const subredditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        startGetSubreddits(state, action) {
            state.isLoading = true;
            state.error = false;
        },
        getSubredditSuccess(state, action) {
            state.isLoading = false;
            state.subreddits = action.payload;
        },
        getSubredditFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
    },
});

export const { startGetSubreddits, getSubredditSuccess, getSubredditFailed } = subredditSlice.actions;
export const selectSubreddits = (state) => state.subreddit.subreddits;
export default subredditSlice.reducer;

export const fetchSubreddits = () => async (dispatch) => {
    try{ 
        dispatch(startGetSubreddits());
        const subreddits = await getSubreddits();
        dispatch(getSubredditSuccess(subreddits));
    } catch (error) {
        dispatch(getSubredditFailed())
    }
}