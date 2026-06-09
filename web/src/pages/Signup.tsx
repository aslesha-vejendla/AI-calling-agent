import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
export default function Signup() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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

  const handleSignup = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    console.log(data)

    if (data.message === "User created successfully") {
      alert("signup successful")
      navigate("/login")
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="email@domain.com"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="auth-main-btn"
          onClick={handleSignup}
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