export type Candidate = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: "active" | "rejected"
  score: number
  rating: "low" | "medium" | "high"
  resumeUrl?: string
}