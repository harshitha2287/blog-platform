import { Link } from "react-router-dom";

import { useState } from "react";

function PostCard({ post }) {

  const [likes, setLikes] = useState(0);

  return (
    <div className="post-card">

      <Link to={`/posts/${post._id}`}>

        <h2 className="post-title">
          {post.title}
        </h2>

      </Link>

      <p>
        {post.content.substring(0, 180)}...
      </p>

      <br />

      <small>
        ✍️ {post.author?.username}
      </small>

      <br /><br />

      <div className="actions">

        <Link to={`/posts/${post._id}`}>

          <button className="btn">
            Read More
          </button>

        </Link>

        <button
          className="btn"
          onClick={() =>
            setLikes(likes + 1)
          }
        >
          ❤️ {likes}
        </button>

      </div>

    </div>
  );
}

export default PostCard;