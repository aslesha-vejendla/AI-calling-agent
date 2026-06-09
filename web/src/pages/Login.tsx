import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
const handleLogin = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    if (data.access_token) {
      localStorage.setItem(
        "token",
        data.access_token
      )
      localStorage.setItem(
        "username",
        data.username
      )
      alert("Login Successful")
      navigate("/")
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.error(error)
    alert("Server Error")
  }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{ marginBottom: "6px" }}>Password</label>

        <input
          type="password"
          placeholder="password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="auth-main-btn"
          onClick={handleLogin}
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