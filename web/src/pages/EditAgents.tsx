import CreateAgent from "./CreateAgent"

function EditAgent() {
  const agentData = {
    name: "Senior Developer",
    type: "Technical Interviewer",
    job: "Hiring backend developers",
    task: "Screen candidates via call",
  }

  return <CreateAgent initialData={agentData} />
}

export default EditAgent