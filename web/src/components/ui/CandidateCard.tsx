import { useState } from "react"

type Props = {
  candidate: {
    name: string
    email: string
    phone: string
    status: string
    file: string
  }
}

function CandidateCard({ candidate }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(!expanded)}
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
      <p>Status: {candidate.status}</p>

      {expanded && (
        <div
          style={{
            marginTop: "10px",
            background: "white",
            padding: "10px",
          }}
        >
          <iframe
            src={candidate.file}
            width="100%"
            height="300px"
            title="resume"
          />
        </div>
      )}
    </div>
  )
}

export default CandidateCard