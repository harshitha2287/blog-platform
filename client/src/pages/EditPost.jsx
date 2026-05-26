import { useEffect, useState } from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

function EditPost() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  useEffect(() => {

    fetchPost();

  }, []);

  const fetchPost = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/posts/${id}`
      );

      setTitle(res.data.title);

      setContent(res.data.content);

    } catch (error) {

      console.log(error);
    }
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
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

      alert("Post updated");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Update failed");
    }
  };

  return (
    <div className="container">

      <div className="form-container">

        <h1>Edit Post</h1>

        <form onSubmit={handleUpdate}>

          <div className="form-group">

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <textarea
              rows="10"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
            />

          </div>

          <button className="btn">
            Update Post
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditPost;