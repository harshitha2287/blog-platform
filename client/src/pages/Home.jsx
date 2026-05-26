import { useEffect, useState } from "react";

import axios from "axios";

import PostCard from "../components/PostCard";

function Home() {

  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchPosts();

  }, []);

  const fetchPosts = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://blog-platform-pql9.onrender.com/api/posts"
      );

      setPosts(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {

    return (
      <div className="container">
        <h2>Loading posts...</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <h1 style={{ marginBottom: "20px" }}>
        Latest Blog Posts
      </h1>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          marginBottom: "25px",
        }}
      />

      {filteredPosts.length === 0 ? (

        <div className="form-container">
          <h3>No posts found</h3>
        </div>

      ) : (

        filteredPosts.map((post) => (

          <PostCard
            key={post._id}
            post={post}
          />
        ))
      )}

    </div>
  );
}

export default Home;