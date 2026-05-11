function HighlightedScript({ text }: { text: string }) {
  const parts = text.split(/(\{.*?\}|\(.*?\))/g)

  return (
    <p>
      {parts.map((part, i) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          return (
            <span key={i} style={{ color: "blue", fontWeight: "bold" }}>
              {part}
            </span>
          )
        }
        if (part.startsWith("(") && part.endsWith(")")) {
          return (
            <span key={i} style={{ color: "orange", fontStyle: "italic" }}>
              {part}
            </span>
          )
        }
        return part
      })}
    </p>
  )
}

export default HighlightedScript
