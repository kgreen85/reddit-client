import React, {useState, useEffect} from "react";
import "./post.css";
import Card from "../../components/Card/card";
import Comment from "../Comment/comment";
import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from "react-icons/ti";
import moment from "moment";

const Post = (props) => {
  const { post } = props;
  const vote = post.ups
  const [votes, setvotes] = useState(vote);
  const [showComment, setShowComment] = useState(false)
  
  const [commentData, setCommentData] = useState([]);
  
  const handleUpvote = () => {
    setvotes(votes + 1);
  }

  const handleDownVote = () => {
    setvotes(votes - 1);
  }

  
    
    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`https://www.reddit.com${post.permalink}.json`);
            const json = await response.json();
            const comments = json[1].data.children.map((subreddit) => subreddit.data)
            setCommentData(comments)
        };
        fetchComments()
    },[post.permalink])
  
  const handleShowComments = () => {
    if (showComment === false) {
      setShowComment(true)
    } else {
      setShowComment(false)
    }
  }


  return (
    <>
      <article key={post.id}>
        <Card>
          <div className="post-wrapper">
            <div className="post-votes-container">
              <button type="button" className="" onClick={handleUpvote}>
                <TiArrowUpOutline />
              </button>
              <p className="post-votes-value">{votes}</p>
              <button type="button" className="" onClick={handleDownVote}>
                <TiArrowDownOutline />
              </button>
            </div>
            <div className="post-container">
              <h3 className="post-title">{post.title}</h3>

              <div className="post-image-container">
                <img src={post.url} className="post-image" alt="" />
              </div>

              <div className="post-details">
                <span className="author-username">{post.author}</span>
                <span>{moment.unix(post.created_utc).fromNow()}</span>
                <span className="post-comments-container">
                  <button type="button" className="" onClick={handleShowComments}>
                    <TiMessage className="icon-action" />
                  </button>
                </span>
              </div>
              {commentData.map((comment) => 
                showComment ? <Comment comment={comment} key={comment.id} /> : null
              )}
              
            </div>
          </div>
        </Card>
      </article>
    </>
  );
};

export default Post;
