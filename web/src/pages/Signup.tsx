import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
  const navigate = useNavigate()

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#ffffff",
    marginBottom: "18px",
    fontSize: "15px",
    outline: "none",
  }

  return (
    <div className="auth-wrapper">

      {/* LEFT OVERLAY */}
      <div className="auth-overlay move-left">
        <div className="auth-overlay-content">
          <h2>Already have an account?</h2>

          <Link to="/login">
            <button className="switch-btn">
              Sign in
            </button>
          </Link>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div
        className="auth-form-section"
        style={{
          marginLeft: "50%",
        }}
      >
        <h1 className="auth-title">
          Signing up
        </h1>

        <p
          style={{
            marginBottom: "25px",
            color: "#666",
          }}
        >
          Create an account
        </p>

        <input
          placeholder="Your Name"
          style={inputStyle}
        />

        <input
          placeholder="email@domain.com"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="password"
          style={inputStyle}
        />

        <button
          className="auth-main-btn"
          onClick={() => navigate("/")}
        >
          Sign up with email
        </button>

        <p
          style={{
            textAlign: "center",
            margin: "22px 0",
            color: "#777",
          }}
        >
          or continue with
        </p>

        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Google
        </button>
      </div>
    </div>
  )
}