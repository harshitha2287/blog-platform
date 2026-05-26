import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  const toggleDarkMode = () => {

    setDarkMode(!darkMode);

    document.body.style.background =
      darkMode ? "#f4f7fb" : "#0f172a";

    document.body.style.color =
      darkMode ? "#333" : "white";
  };

  return (
    <div className="navbar">

      <div className="nav-content">

        <Link to="/">

          <h2 className="logo">
            ✨ BlogSphere
          </h2>

        </Link>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          {!token ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">

                <button className="btn">
                  Dashboard
                </button>

              </Link>

              <Link to="/create">

                <button className="btn">
                  Create Post
                </button>

              </Link>

              <button
                className="btn delete-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          <button
            className="btn"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Navbar;