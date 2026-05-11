import { useNavigate } from "react-router-dom"

type Props = {
  id: number
  title: string
  subtitle?: string
}

export default function AgentCard({
  id,
  title,
  subtitle,
}: Props) {

  const navigate = useNavigate()

  return (
    <div
      className="agent-card-wrapper"
      style={{
        padding: "12px",
      }}
    >

      <div
        className="agent-card"
        onClick={() => navigate(`/agents/${id}`)}
        style={{
          width: "340px",
        }}
      >

        {/* TOP SECTION */}
        <div
          className="agent-top"
          style={{
            background:
              "linear-gradient(145deg, #5d1290, #c377f0)",
            borderRadius: "24px 24px 0 0",
          }}
        >

          <h2
            className="agent-title"
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              lineHeight: 1.2,
              padding: "0 10px",
            }}
          >
            {title}
          </h2>

        </div>

        {/* EXPANDABLE CONTENT */}
        <div
          className="agent-expand-content"
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "0 0 24px 24px",
          }}
        >

          <div className="agent-info-row">
            <span>Role</span>
            <span>Interview AI</span>
          </div>

          <div className="agent-info-row">
            <span>Status</span>
            <span
              style={{
                color: "#16a34a",
                fontWeight: 700,
              }}
            >
              Running
            </span>
          </div>

          <div className="agent-info-row">
            <span>Calls</span>
            <span>24 Active</span>
          </div>

          <div className="agent-info-row">
            <span>Language</span>
            <span>English</span>
          </div>

          <p
            style={{
              marginTop: "18px",
              color: "#666666",
              fontSize: "14px",
              lineHeight: 1.7,
            }}
          >
            {subtitle || "AI-powered calling and interview agent"}
          </p>

          {/* BUTTONS */}
          <div
            className="agent-actions"
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
            }}
          >

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/agents/${id}`)
              }}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRadius: "12px",
                background: "#6d28d9",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ✏ Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                alert("Delete Agent")
              }}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRadius: "12px",
                background: "#ef4444",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              🗑 Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}