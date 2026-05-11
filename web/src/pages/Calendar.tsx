import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState, useEffect } from "react"

const localizer = momentLocalizer(moment)

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([])

  // ✅ LOAD EVENTS (THIS IS THE FIX)
  useEffect(() => {
    const saved = localStorage.getItem("calendarEvents")
    if (saved) {
      setEvents(JSON.parse(saved))
    }
  }, [])

  const handleSelectSlot = ({ start, end }: any) => {
    const title = prompt("Enter Candidate Name / Call Title")

    if (title) {
      const newEvent = { title, start, end }

      setEvents((prev) => {
        const updated = [...prev, newEvent]
        localStorage.setItem("calendarEvents", JSON.stringify(updated))
        return updated
      })
    }
  }

  return (
    <div style={{ padding: "20px", height: "90vh" }}>
      <h2>Schedule Calls</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{
          height: "80vh",
          background: "white",
          padding: "10px",
          borderRadius: "10px",
        }}
      />
    </div>
  )
}