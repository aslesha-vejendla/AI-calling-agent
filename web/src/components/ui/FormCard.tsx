type Props = {
  title: string
  subtitle?: string
  children: React.ReactNode
}

function FormCard({ title, subtitle, children }: Props) {
  return (
    <div
      style={{
        background: "#e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h3>{title}</h3>
      {subtitle && (
        <p style={{ fontSize: "12px", color: "#555" }}>{subtitle}</p>
      )}

      <div style={{ marginTop: "15px" }}>{children}</div>
    </div>
  )
}

export default FormCard