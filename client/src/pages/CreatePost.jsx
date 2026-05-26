import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function CreatePost() {

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "https://blog-platform-pql9.onrender.com/api/posts",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post created successfully");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Failed to create post");
    }
  };

  return (
    <div className="container">

      <div className="form-container">

        <h1>Create New Post</h1>

        <br />

        <form onSubmit={handleCreate}>

          <div className="form-group">

            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <textarea
              rows="12"
              placeholder="Write your blog content..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              required
            />

          </div>

          <button className="btn">
            Publish Post
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreatePost;