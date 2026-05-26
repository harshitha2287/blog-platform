import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

function PostDetails() {

  const { id } = useParams();

  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  useEffect(() => {

    fetchPost();

    fetchComments();

  }, []);

  const fetchPost = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/posts/${id}`
      );

      setPost(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchComments = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/comments/${id}`
      );

      setComments(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleComment = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/comments/${id}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");

      fetchComments();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add comment"
      );
    }
  };

  if (!post) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">

      <div className="post-card">

        <h1>{post.title}</h1>

        <br />

        <p>{post.content}</p>

        <br />

        <small>
          By {post.author?.username}
        </small>

      </div>

      <div className="form-container">

        <h2>Comments</h2>

        <br />

        <form onSubmit={handleComment}>

          <textarea
            placeholder="Write comment..."
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <br /><br />

          <button className="btn">
            Add Comment
          </button>

        </form>

        <br />

        {comments.map((comment) => (

          <div
            key={comment._id}
            className="comment-box"
          >

            <p>{comment.text}</p>

            <br />

            <small>
              By {comment.user?.username}
            </small>

          </div>
        ))}

      </div>

    </div>
  );
}

export default PostDetails;