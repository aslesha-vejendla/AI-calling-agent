type Props = {
  label: string
  value: string
  onChange: (val: string) => void
}

export default function ScriptBox({
  label,
  value,
  onChange,
}: Props) {
  const variables = [
    "{first_name}",
    "{job_role}",
    "{company_name}",
    "{experience}",
  ]

  const actions = [
    "(wait for response)",
    "(pause)",
    "(transfer call)",
    "(end call)",
  ]

  // 🔥 INSERT INTO TEXTAREA
  const insertText = (text: string) => {
    onChange(value + " " + text)
  }

  return (
    <div>
      <h4 style={{ marginBottom: "10px" }}>
        {label}
      </h4>

      {/* VARIABLES */}
      <div style={{ marginBottom: "15px" }}>
        <p
          style={{
            fontSize: "13px",
            marginBottom: "8px",
            color: "#fafafa",
          }}
        >
          VARIABLES
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {variables.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => insertText(item)}
              style={{
                border: "none",
                padding: "8px 14px",
                borderRadius: "20px",
                background: "#ede9fe",
                color: "#5b21b6",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{ marginBottom: "15px" }}>
        <p
          style={{
            fontSize: "13px",
            marginBottom: "8px",
            color: "#666",
          }}
        >
          ACTIONS
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {actions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => insertText(item)}
              style={{
                border: "none",
                padding: "8px 14px",
                borderRadius: "20px",
                background: "#dbeafe",
                color: "#1d4ed8",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* TEXTAREA */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your AI call script..."
        style={{
          width: "100%",
          minHeight: "180px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          padding: "15px",
          resize: "vertical",
          outline: "none",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      />
    </div>
  )
}