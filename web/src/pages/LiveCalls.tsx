import { useEffect, useState } from "react"
import {
  Phone,
  Clock,
  Activity,
  Volume2,
  Mic,
  MicOff,
} from "lucide-react"

const initialCalls = [
  {
    id: 1,
    candidate: "Sarah Johnson",
    agent: "Senior Dev Agent",
    duration: "12:34",
    stage: "Technical Questions",
  },
  {
    id: 2,
    candidate: "Mike Chen",
    agent: "Full Stack Agent",
    duration: "08:15",
    stage: "Introduction",
  },
  {
    id: 3,
    candidate: "Emily Davis",
    agent: "Frontend Agent",
    duration: "18:42",
    stage: "Experience Discussion",
  },
]

export default function LiveCalls() {
  const [liveCalls, setLiveCalls] = useState(initialCalls)

  // fake timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCalls((prev) =>
        prev.map((call) => ({
          ...call,
          duration: updateDuration(call.duration),
        }))
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const updateDuration = (time: string) => {
    const [min, sec] = time.split(":").map(Number)

    let total = min * 60 + sec + 1

    const newMin = Math.floor(total / 60)
    const newSec = total % 60

    return `${String(newMin).padStart(2, "0")}:${String(
      newSec
    ).padStart(2, "0")}`
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "28px" }}>
            Live Call Monitoring
          </h1>

          <p style={{ color: "#666" }}>
            Monitor active calls in real-time
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#dcfce7",
            padding: "10px 18px",
            borderRadius: "10px",
          }}
        >
          <Activity
            size={18}
            color="#16a34a"
            className="pulse"
          />

          <span
            style={{
              color: "#16a34a",
              fontWeight: 600,
            }}
          >
            {liveCalls.length} Active Calls
          </span>
        </div>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {liveCalls.map((call) => (
          <div
            key={call.id}
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "20px",
              transition: "0.3s",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.05)",
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
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                {/* AVATAR */}
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,#6366f1,#9333ea)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {call.candidate.charAt(0)}
                </div>

                <div>
                  <h3>{call.candidate}</h3>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    {call.agent}
                  </p>
                </div>
              </div>

              {/* ACTIVE DOT */}
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#16a34a",
                  boxShadow:
                    "0 0 10px rgba(22,163,74,0.7)",
                }}
              />
            </div>

            {/* INFO */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  color: "#666",
                }}
              >
                <Clock size={16} />
                <span>Duration</span>
              </div>

              <span>{call.duration}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  color: "#666",
                }}
              >
                <Phone size={16} />
                <span>Stage</span>
              </div>

              <span>{call.stage}</span>
            </div>

            {/* AUDIO LEVEL */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  Audio Level
                </span>

                <Volume2 size={16} color="#6366f1" />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "2px",
                }}
              >
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: "25px",
                      borderRadius: "4px",
                      background:
                        i < 12
                          ? "#16a34a"
                          : i < 16
                          ? "#f97316"
                          : "#dc2626",
                      opacity:
                        i > Math.random() * 18
                          ? 0.2
                          : 1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#eef2ff",
                  color: "#6366f1",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Mic size={16} />
                Listen
              </button>

              <button
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#fee2e2",
                  color: "#dc2626",
                  cursor: "pointer",
                }}
              >
                <MicOff size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}