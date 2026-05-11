import { useRef } from "react"

type Props = {
  onFileUpload: (file: File) => void
}

function UploadBox({ onFileUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        padding: "30px",
        background: "#e5e7eb",
        borderRadius: "12px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <p>Click to upload resume</p>

      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  )
}

export default UploadBox