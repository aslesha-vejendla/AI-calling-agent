import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function Layout() {
  return (
    <div>
      <Sidebar />

      <div
        style={{
          marginLeft: "230px",
          padding: "30px",
          minHeight: "100vh",
          background: "#f3f4f6",
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Layout