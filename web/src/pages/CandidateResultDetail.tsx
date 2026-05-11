import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function CandidateResultDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("candidates")
    if (stored) {
      const list = JSON.parse(stored)
      const found = list.find((c: any) => c.id === id)
      setCandidate(found)
    }
  }, [id])

  const updateStatus = (status: string) => {
    const stored = localStorage.getItem("candidates")
    if (!stored) return

    const list = JSON.parse(stored)

    const updated = list.map((c: any) =>
      c.id === id ? { ...c, status } : c
    )

    localStorage.setItem("candidates", JSON.stringify(updated))
    navigate("/candidates")
  }

  if (!candidate) return <p>Loading...</p>

  return (
    <div style={{ padding: "20px" }}>
      <h2>{candidate.name}</h2>

      {/* SCORE */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Overall Score</h4>
        <div style={{ background: "#eee", borderRadius: "10px" }}>
          <div
            style={{
              width: `${candidate.score}%`,
              background: "red",
              padding: "10px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            {candidate.score}%
          </div>
        </div>
      </div>

      {/* BREAKDOWN */}
      <div>
        <h4>AI Evaluation Breakdown</h4>
        <p>Communication: 50%</p>
        <p>Technical Skills: 30%</p>
      </div>

      {/* STRENGTH / WEAKNESS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            flex: 1,
            background: "#d4f5d4",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h4>Strength</h4>
          <p>Eager to learn</p>
          <p>Good attitude</p>
        </div>

        <div
          style={{
            flex: 1,
            background: "#f8d7da",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h4>Weakness</h4>
          <p>Limited DB knowledge</p>
          <p>No experience</p>
        </div>
      </div>

      {/* SUMMARY */}
      <div style={{ marginTop: "20px" }}>
        <h4>AI Summary</h4>
        <p>
          The candidate demonstrates a solid foundation and willingness to learn,
          but lacks depth for senior roles.
        </p>
      </div>

      {/* TRANSCRIPT */}
      <div style={{ marginTop: "20px" }}>
        <h4>Call Transcript</h4>
        <div
          style={{
            background: "#eee",
            padding: "10px",
            borderRadius: "10px",
            height: "150px",
            overflowY: "scroll",
          }}
        >
          <p>00:00 AI: Hello...</p>
          <p>00:12 Candidate: Thank you...</p>
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => updateStatus("active")}
          style={{
            background: "green",
            color: "white",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          Proceed To Next Round
        </button>

        <button
          onClick={() => updateStatus("rejected")}
          style={{
            background: "red",
            color: "white",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          Reject Candidate
        </button>

        <button
          onClick={() => alert("Feedback sent")}
          style={{
            background: "black",
            color: "white",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          Send Feedback
        </button>
      </div>
    </div>
  )
}