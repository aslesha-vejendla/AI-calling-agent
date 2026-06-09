import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const recentActivity = [
    {
      candidate: "Sarah Johnson",
      agent: "Senior Dev Agent",
      status: "Completed",
      score: "92%",
      time: "2 min ago",
    },
    {
      candidate: "Mike Chen",
      agent: "Full Stack Agent",
      status: "In Progress",
      score: "-",
      time: "5 min ago",
    },
    {
      candidate: "Emily Davis",
      agent: "Frontend Agent",
      status: "Completed",
      score: "78%",
      time: "12 min ago",
    },
    {
      candidate: "David Wilson",
      agent: "Backend Agent",
      status: "Completed",
      score: "85%",
      time: "18 min ago",
    },
    {
      candidate: "Lisa Anderson",
      agent: "DevOps Agent",
      status: "Failed",
      score: "45%",
      time: "25 min ago",
    },
  ]

const navigate = useNavigate()

const username = 
  localStorage.getItem("username") 
useEffect(() => {

  const token =
    localStorage.getItem("token")

  if (!token) {
    navigate("/login")
  }

}, [])

  return (
    <div style={{ padding: "20px" }}>
      {/* WELCOME */}
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ marginBottom: "5px" }}>
          Welcome back, {username}
        </h1>

        <p style={{ color: "#777" }}>
          Here’s what’s happening with your AI recruitment system today.
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        <StatCard title="Total Candidates" value="120" />
        <StatCard title="Calls Today" value="45" />
        <StatCard title="Shortlisted" value="18" />
        <StatCard title="Success Rate" value="72%" />
      </div>

      {/* GRAPH + CLIENTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* GRAPH */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h4>Agent Performance</h4>

          <div
            style={{
              height: "220px",
              background: "#f5f5f5",
              borderRadius: "10px",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
            }}
          >
            Graph will be added
          </div>
        </div>

        {/* CLIENT SESSIONS */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h4>Client Sessions</h4>

          <SessionItem
            name="Google"
            sessions="12"
            amount="$240"
          />

          <SessionItem
            name="Amazon"
            sessions="8"
            amount="$160"
          />

          <SessionItem
            name="Infosys"
            sessions="15"
            amount="$300"
          />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div
        style={{
          background: "white",
          marginTop: "30px",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        {/* TOP */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3>Recent Activity</h3>

          <span
            style={{
              color: "#4f46e5",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            View All →
          </span>
        </div>

        {/* TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                textAlign: "left",
                color: "#777",
                fontSize: "14px",
              }}
            >
              <th style={{ paddingBottom: "12px" }}>
                Candidate
              </th>

              <th>Agent</th>

              <th>Status</th>

              <th>Score</th>

              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {recentActivity.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderTop: "1px solid #eee",
                }}
              >
                {/* Candidate */}
                <td
                  style={{
                    padding: "15px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      background: "#ede9fe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {item.candidate.charAt(0)}
                  </div>

                  {item.candidate}
                </td>

                <td>{item.agent}</td>

                {/* STATUS */}
                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      background:
                        item.status === "Completed"
                          ? "#dcfce7"
                          : item.status === "Failed"
                          ? "#fee2e2"
                          : "#fef3c7",

                      color:
                        item.status === "Completed"
                          ? "green"
                          : item.status === "Failed"
                          ? "red"
                          : "#b45309",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td>{item.score}</td>

                <td style={{ color: "#777" }}>
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* 🔹 COMPONENTS */

function StatCard({ title, value }: any) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <p style={{ color: "#777" }}>{title}</p>

      <h2>{value}</h2>
    </div>
  )
}

function SessionItem({ name, sessions, amount }: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px",
        paddingBottom: "10px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div>
        <p style={{ margin: 0 }}>{name}</p>

        <small style={{ color: "#777" }}>
          {sessions} sessions
        </small>
      </div>

      <strong>{amount}</strong>
    </div>
  )
}