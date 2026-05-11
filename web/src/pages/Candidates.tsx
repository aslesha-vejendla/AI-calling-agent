import { useState } from "react"
import CandidateCard from "../components/candidates/CandidateCard"
import CandidateDetails from "../components/candidates/CandidateDetails"

export default function Candidates() {
  // ✅ Load candidates from localStorage on first render
  const [candidates, setCandidates] = useState<any[]>(() => {
    const saved = localStorage.getItem("candidates")
    return saved ? JSON.parse(saved) : []
  })

  const [selected, setSelected] = useState<any>(null)
const handleUpload = (file: File) => {
  const fileURL = URL.createObjectURL(file)

  const newCandidate = {
    id: Date.now().toString(),
    name: file.name.replace(".pdf", ""),
    email: "demo@email.com",
    phone: "+91 9999999999",
    role: "Unknown",
    status: "active",
    score: Math.floor(Math.random() * 100),
    rating: "medium",
    fileURL, // ✅ IMPORTANT
  }

  setCandidates((prev) => {
    const updated = [...prev, newCandidate]
    localStorage.setItem("candidates", JSON.stringify(updated))
    return updated
  })
}

  return (
    <div style={{ padding: "20px" }}>
      <h2>Candidates</h2>

      {/* 🔥 Upload Box */}
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0])
          }
        }}
      />

      {/* 🔥 GRID */}
      {!selected && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {candidates.map((c) => (
            <CandidateCard
              candidate={c}
              onClick={() => setSelected(c)}
            />
          ))}
        </div>
      )}

      {/* 🔥 DETAILS */}
      {selected && (
        <CandidateDetails
          data={selected}
          onClose={() => setSelected(null)}
          onAccept={() => {
            setCandidates((prev) => {
              const updated = prev.map((c) =>
                c.id === selected.id ? { ...c, status: "active" } : c
              )
              localStorage.setItem("candidates", JSON.stringify(updated))
              return updated
            })
            setSelected(null)
          }}
          onReject={() => {
            setCandidates((prev) => {
              const updated = prev.map((c) =>
                c.id === selected.id ? { ...c, status: "rejected" } : c
              )
              localStorage.setItem("candidates", JSON.stringify(updated))
              return updated
            })
            setSelected(null)
          }}
        />
      )}
    </div>
  )
}
