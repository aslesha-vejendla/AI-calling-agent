import type { Candidate } from "../../types/Candidate"

type Props = {
  data: Candidate
  onClose: () => void
  onAccept: () => void
  onReject: () => void
}

export default function CandidateDetails({
  data,
  onClose,
  onAccept,
  onReject,
}: Props) {
  return (
    <div style={{ padding: "20px", background: "#eee" }}>
      <h2>{data.name}</h2>

      <h3>Score: {data.score}%</h3>

      {/* ✅ Resume Preview FIXED */}
      <div style={{ margin: "20px 0" }}>
        <h4>Uploaded Document</h4>

        {data.fileURL ? (
          <iframe
            src={data.fileURL}
            width="100%"
            height="500px"
            style={{ borderRadius: "10px", border: "none" }}
            title="candidate resume"
          />
        ) : (
          <p>No document available</p>
        )}
      </div>

      {/* Strength / Weakness */}
      <div>
        <h4>Strengths</h4>
        <p>Good communication, eager to learn</p>

        <h4>Weakness</h4>
        <p>Limited experience</p>
      </div>

      {/* Summary */}
      <textarea
        style={{ width: "100%", height: "120px" }}
        defaultValue="AI summary here..."
      />

      {/* Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={onAccept}
          style={{
            background: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "20px",
          }}
        >
          Proceed
        </button>

        <button
          onClick={onReject}
          style={{
            background: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "20px",
          }}
        >
          Reject
        </button>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}