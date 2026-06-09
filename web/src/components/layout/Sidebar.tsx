import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Menu,
  X,
  LayoutDashboard,
  Bot,
  Users,
  BarChart3,
  Phone,
  Briefcase,
  Workflow,
  Calendar,
  Settings,
} from "lucide-react"

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  const discover = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "AI Agents",
      path: "/agents",
      icon: <Bot size={18} />,
    },
    {
      name: "Candidates",
      path: "/candidates",
      icon: <Users size={18} />,
    },
    {
      name: "Results",
      path: "/results",
      icon: <BarChart3 size={18} />,
    },
  ]

  const library = [
    {
      name: "Live Calls",
      path: "/live-calls",
      icon: <Phone size={18} />,
    },
    {
      name: "Client Management",
      path: "/jobs",
      icon: <Briefcase size={18} />,
    },
    {
      name: "Automation",
      path: "/automation",
      icon: <Workflow size={18} />,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: <Calendar size={18} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={18} />,
    },
   ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div
      style={{
        width: open ? "230px" : "80px",
        height: "100vh",
         position: "fixed",
         left: 0,
          top: 0,
          zIndex: 1000,
        background: "#630d95",
        padding: "20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        transition: "0.3s",
        overflow: "hidden",
      }}
    >
      {/* TOP */}
      <div
        style={{
          display: "flex",
          justifyContent: open ? "space-between" : "center",
          alignItems: "center",
        }}
      >
        {open && <h3>Sarthi Calling Agent</h3>}

        <button
          onClick={() => setOpen(!open)}
          style={{
            border: "none",
            background: "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Discover */}
      <div>
        {open && (
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            Discover
          </p>
        )}

        {discover.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "6px",
              textDecoration: "none",
              background: isActive(item.path)
                ? "#60a5fa"
                : "#93c5fd",
              color: "black",
              whiteSpace: "nowrap",
            }}
          >
            {item.icon}

            {open && item.name}
          </Link>
        ))}
      </div>

      {/* Library */}
      <div>
        {open && (
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            Library
          </p>
        )}

        {library.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "6px",
              textDecoration: "none",
              background: "#d9f99d",
              color: "black",
              whiteSpace: "nowrap",
            }}
          >
            {item.icon}

            {open && item.name}
          </Link>
        ))}
        <button
          onClick={() => {
            localStorage.removeItem("token")
            navigate("/login")
          }}
          style={{
            border: "none",
            background: "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar