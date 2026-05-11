import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/layout/Layout"

// Pages
import Dashboard from "./pages/Dashboard"
import Agents from "./pages/Agents"
import Candidates from "./pages/Candidates"
import CreateAgent from "./pages/CreateAgent"
import EditAgent from "./pages/EditAgents"
import TestAgent from "./pages/TestAgent"
import Results from "./pages/Results"
import CandidateResultDetail from "./pages/CandidateResultDetail"
import CalendarPage from "./pages/Calendar"
import LiveCalls from "./pages/LiveCalls"

// Auth Pages
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES (NO SIDEBAR) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* APP ROUTES (WITH SIDEBAR LAYOUT) */}
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="agents" element={<Agents />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="create-agent" element={<CreateAgent />} />
          <Route path="agents/:id" element={<EditAgent />} />
          <Route path="test-agent" element={<TestAgent />} />
          <Route path="results" element={<Results />} />
          <Route path="results/:id" element={<CandidateResultDetail />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="live-calls" element={<LiveCalls />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App