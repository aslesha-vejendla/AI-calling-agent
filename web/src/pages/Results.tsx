import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Candidate = {
  id: string
  name: string
  role: string
  score: number
  status: string
}

export default function Results() {
  const [data, setData] = useState<Candidate[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem("candidates")
    if (stored) {
      setData(JSON.parse(stored))
    }
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h2>Interview Results</h2>
      <p>Review candidate interview outcomes and make decisions</p>

      {/* Search + Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Search..."
          style={{ padding: "8px", width: "200px" }}
        />
        <button>Filter</button>
        <select>
          <option>All Agents</option>
        </select>
        <select>
          <option>All Roles</option>
        </select>
      </div>

      {/* Table */}
      <table width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
            <th>Candidate</th>
            <th>Role</th>
            <th>Call ID</th>
            <th>Score</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{c.name}</td>
              <td>{c.role}</td>
              <td>{c.id.slice(0, 8)}</td>

              {/* Score */}
              <td>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "6px",
                    background: "#eee",
                  }}
                >
                  {c.score}%
                </span>
              </td>

              {/* Status */}
              <td>
                <span
                  style={{
                    background: c.status === "active" ? "green" : "red",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {c.status === "active" ? "Pass" : "Fail"}
                </span>
              </td>

              {/* Rating */}
              <td>
                <span
                  style={{
                    background:
                      c.score > 75
                        ? "#d4f5d4"
                        : c.score > 40
                        ? "#fff3cd"
                        : "#f8d7da",
                    padding: "4px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {c.score > 75
                    ? "High"
                    : c.score > 40
                    ? "Medium"
                    : "Low"}
                </span>
              </td>

              {/* Duration (dummy for now) */}
              <td>
                {Math.floor(Math.random() * 15)}:
                {Math.floor(Math.random() * 60)
                  .toString()
                  .padStart(2, "0")}
              </td>

              {/* Action */}
              <td>
                <button
                  onClick={() => navigate(`/results/${c.id}`)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
