import { getSubredditPosts } from "../api/reddit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: "/r/pics/",
};

const homeSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    getPostsLoading(state, action) {
      state.isLoading = true;
      state.error = false;
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostsError(state, action) {
      state.isLoading = false;
      state.error = true;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload
    },
  },
});

export const { setPosts, getPostsLoading, getPostsSuccess, getPostsError, setSearchTerm, setSelectedSubreddit } =
  homeSlice.actions;

export default homeSlice.reducer;

export const selectPosts = (state) => state.reddit.posts;
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(getPostsLoading());
    const posts = await getSubredditPosts(subreddit);
    
    dispatch(getPostsSuccess(posts));
  } catch (error) {
    dispatch(getPostsError())
  }
}