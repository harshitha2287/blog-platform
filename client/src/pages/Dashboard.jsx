import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

function Dashboard() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    fetchPosts();

  }, []);

  const fetchPosts = async () => {

    try {

      const res = await axios.get(
        "https://blog-platform-pql9.onrender.com/api/posts"
      );

      const token = localStorage.getItem("token");

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const userPosts = res.data.filter(
        (post) => post.author?._id === payload.id
      );

      setPosts(userPosts);

    } catch (error) {

      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://blog-platform-pql9.onrender.com/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPosts();

    } catch (error) {

      console.log(error);

      alert("Delete failed");
    }
  };

  return (
    <div className="container">

      <div className="dashboard-header">

        <h1>My Dashboard</h1>

        <Link to="/create">

          <button className="btn">
            Create Post
          </button>

        </Link>

      </div>

      {posts.map((post) => (

        <div
          key={post._id}
          className="post-card"
        >

          <h2>{post.title}</h2>

          <br />

          <p>
            {post.content.substring(0, 200)}...
          </p>

          <br />

          <div className="actions">

            <Link to={`/posts/${post._id}`}>

              <button className="btn">
                View
              </button>

            </Link>

            <Link to={`/edit/${post._id}`}>

              <button className="btn">
                Edit
              </button>

            </Link>

            <button
              className="btn delete-btn"
              onClick={() =>
                handleDelete(post._id)
              }
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}

export default Dashboard;