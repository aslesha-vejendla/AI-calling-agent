import { useNavigate } from "react-router-dom"
import AgentCard from "../components/Agents/AgentCard"

export default function Agents() {

  const navigate = useNavigate()

  const agents = [
    {
      id: 1,
      name: "Hiring Agent",
      subtitle: "AI Interview Assistant",
    },
    {
      id: 2,
      name: "Sales Caller",
      subtitle: "Outbound AI Caller",
    },
    {
      id: 3,
      name: "Support Agent",
      subtitle: "Customer Support AI",
    },
  ]

  return (
    <div
      style={{
        padding: "40px",
      }}
    >

      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >

        <h1
          style={{
            fontSize: "38px",
            fontWeight: 700,
          }}
        >
          Agents
        </h1>

        <button
          onClick={() => navigate("/create-agent")}
          style={{
            background: "#8937cc",
            color: "white",
            border: "none",
            padding: "14px 24px",
            borderRadius: "14px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "15px",
            boxShadow: "0 10px 24px rgba(53, 8, 124, 0.22)",
          }}
        >
          + Create Agent
        </button>

      </div>

      {/* AGENT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: "24px",
        }}
      >

        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            id={agent.id}
            title={agent.name}
            subtitle={agent.subtitle}
          />
        ))}

      </div>

    </div>
  )
}