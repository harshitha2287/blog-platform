import { Link } from "react-router-dom";

function NotFound() {

  return (
    <div
      className="container"
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >

      <h1
        style={{
          fontSize: "80px",
        }}
      >
        404
      </h1>

      <br />

      <h2>Page Not Found</h2>

      <br />

      <Link to="/">

        <button className="btn">
          Go Home
        </button>

      </Link>

    </div>
  );
}

export default NotFound;