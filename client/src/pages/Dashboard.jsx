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
        "http://localhost:5000/api/posts"
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
        `http://localhost:5000/api/posts/${id}`,
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div className="post-card">

          <h2>{posts.length}</h2>

          <p>Total Posts</p>

        </div>

        <div className="post-card">

          <h2>
            {
              posts.reduce(
                (acc, post) =>
                  acc +
                  post.content.split(" ").length,
                0
              )
            }
          </h2>

          <p>Total Words</p>

        </div>

      </div>

      {posts.length === 0 ? (

        <div className="form-container">

          <h3>No posts created yet</h3>

        </div>

      ) : (

        posts.map((post) => (

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
        ))
      )}

    </div>
  );
}

export default Dashboard;