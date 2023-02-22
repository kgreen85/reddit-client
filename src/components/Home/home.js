import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../features/Post/post";
import { selectPosts, fetchPosts } from "../../store/homeSlice";

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, selectedSubreddit } = reddit;
  const selectedPosts = useSelector(selectPosts);
  const term = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch()
  
  const posts = selectedPosts.filter((post) =>
    post.title.toLowerCase().includes(term.toLowerCase())
  );


  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit])


  if (isLoading) {
    return <h2>Loading</h2>
  } else if (error) {
    return <h2>Error no data available</h2>
  } else {
  return (
    <>
      {posts.map((post, index) => (
        <Post key={post.id} post={post} />
      ))}
      
    </>
  );
  }
};

export default Home;
