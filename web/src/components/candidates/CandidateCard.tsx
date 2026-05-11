import { useState } from "react"

type Candidate = {
  name: string
  email: string
  phone: string
  status: string
  file: string
}

type Props = {
  candidate: Candidate
  onClick: () => void
}

function CandidateCard({ candidate, onClick }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={onClick}   // ✅ use parent-provided onClick instead of toggling expanded
      style={{
        background: "#7aa6b8",
        padding: "10px",
        borderRadius: "10px",
        color: "white",
        cursor: "pointer",
      }}
    >
      <h4>{candidate.name}</h4>
      <p>{candidate.email}</p>
      <p>{candidate.phone}</p>

      {/* Status badge */}
      <span
        style={{
          background: candidate.status === "active" ? "green" : "red",
          color: "white",
          padding: "5px 10px",
          borderRadius: "20px",
        }}
      >
        {candidate.status === "active" ? "Active" : "Deactive"}
      </span>

      {/* Optional: keep a separate button for expanding resume */}
      <button
        onClick={(e) => {
          e.stopPropagation() // prevent triggering parent onClick
          setExpanded(!expanded)
        }}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {expanded ? "Hide Resume" : "View Resume"}
      </button>

      {expanded && (
        <div
          style={{
            marginTop: "10px",
            background: "white",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <iframe
            src={candidate.file}
            width="100%"
            height="300px"
            title="resume"
            style={{ border: "none" }}
          />
        </div>
      )}
    </div>
  )
}

export default CandidateCard
