import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#f3f3f3",
    marginBottom: "18px",
    fontSize: "15px",
    outline: "none",
  }

  const socialBtn = {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontWeight: 500,
  }

  return (
    <div className="auth-wrapper">

      {/* LEFT FORM */}
      <div className="auth-form-section">
        <h1 className="auth-title">
          Welcome to Sarthi
          <br />
          Calling Agent
        </h1>

        <label style={{ marginBottom: "6px" }}>Email</label>

        <input
          placeholder="email@domain.com"
          style={inputStyle}
        />

        <label style={{ marginBottom: "6px" }}>Password</label>

        <input
          type="password"
          placeholder="password"
          style={inputStyle}
        />

        <button
          className="auth-main-btn"
          onClick={() => navigate("/")}
        >
          Login
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

        <div style={{ display: "flex", gap: "12px" }}>
          <button style={socialBtn}>
            Google
          </button>

          <button style={socialBtn}>
            Outlook
          </button>
        </div>
      </div>

      {/* RIGHT OVERLAY */}
      <div className="auth-overlay">
        <div className="auth-overlay-content">
          <h2>Don’t have an account?</h2>

          <Link to="/signup">
            <button className="switch-btn">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}