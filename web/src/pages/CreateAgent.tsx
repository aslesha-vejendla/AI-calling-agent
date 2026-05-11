import { useState } from "react"
import { useNavigate } from "react-router-dom"

import FormCard from "../components/ui/FormCard"
import ScriptBox from "../components/ui/ScriptBox"

type Props = {
  initialData?: any
}

function CreateAgent({ initialData }: Props) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "",
    job: initialData?.job || "",
    task: initialData?.task || "",
    greeting: initialData?.greeting || "",
    closing: initialData?.closing || "",
    jdFileName: initialData?.jdFileName || "",
    jdFileURL: initialData?.jdFileURL || "",
  })

  //  JD UPLOAD HANDLER
  const handleJDUpload = (file: File) => {
    const fileURL = URL.createObjectURL(file)

    setForm((prev) => ({
      ...prev,
      jdFileName: file.name,
      jdFileURL: fileURL,
    }))
  }

  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px" }}>
      <h2>{initialData ? "Edit Agent" : "Create Agent"}</h2>

      {/*  Search  */}
      <input
        placeholder="Search..."
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/*  Agent Info */}
      <FormCard title="Agent Information">
        <input
          style={inputStyle}
          placeholder="Agent Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          style={inputStyle}
          placeholder="Agent Type"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        />

        {/*  Manual JD Input */}
        <textarea
          style={inputStyle}
          placeholder="Job Description (Manual Entry)"
          value={form.job}
          onChange={(e) =>
            setForm({ ...form, job: e.target.value })
          }
        />

        <textarea
          style={inputStyle}
          placeholder="Task Description"
          value={form.task}
          onChange={(e) =>
            setForm({ ...form, task: e.target.value })
          }
        />
      </FormCard>

      {/*  JD UPLOAD SECTION */}
      <FormCard title="Upload Job Description">
        <input
          style={inputStyle}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleJDUpload(e.target.files[0])
            }
          }}
        />

        {form.jdFileName && (
          <div style={{ marginTop: "10px" }}>
            <p> {form.jdFileName}</p>

            <a
              href={form.jdFileURL}
              target="_blank"
              style={{ color: "blue" }}
            >
              View Document
            </a>
          </div>
        )}
      </FormCard>

      {/*  Call Settings */}
      <FormCard title="Call Setting" subtitle="Call behavior and limits">
        <input style={inputStyle} placeholder="Call Duration (5 min)" />
        <input style={inputStyle} placeholder="Timing" />
        <input style={inputStyle} placeholder="Attempts" />
        <input style={inputStyle} placeholder="Country & Language" />
      </FormCard>

      {/*  Greeting */}
      <FormCard title="Initial Greeting">
        <ScriptBox
          label="Greeting Script"
          value={form.greeting}
          onChange={(val: string) =>
            setForm({ ...form, greeting: val })
          }
        />
      </FormCard>

      {/*  Closing */}
      <FormCard title="Closing">
        <ScriptBox
          label="Closing Script"
          value={form.closing}
          onChange={(val: string) =>
            setForm({ ...form, closing: val })
          }
        />
      </FormCard>

      {/*  Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          style={{
            background: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          {initialData ? "Update Agent" : "Save Agent"}
        </button>

        <button
          onClick={() => navigate("/test-agent")}
          style={{
            background: "blue",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Test Agent
        </button>
      </div>
    </div>
  )
}

export default CreateAgent