import { useState } from "react"

function TestAgent() {
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Hi, am I speaking with John?" },
  ])

  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input) return

    setMessages([...messages, { sender: "User", text: input }])
    setInput("")

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: "Thanks, let's continue." },
      ])
    }, 1000)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Test Agent</h2>

      <div style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}>{m.sender}: {m.text}</div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default TestAgent