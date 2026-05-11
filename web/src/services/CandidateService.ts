import type { Candidate } from "../types/Candidate"

let candidates: Candidate[] = []

export const getCandidates = () => candidates

export const addCandidate = (candidate: Candidate) => {
  candidates.push(candidate)
}

export const updateCandidateStatus = (id: string, status: "active" | "rejected") => {
  candidates = candidates.map(c =>
    c.id === id ? { ...c, status } : c
  )
}