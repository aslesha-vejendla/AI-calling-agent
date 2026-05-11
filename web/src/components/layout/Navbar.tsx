import './Navbar.css'
import logo from '../../assets/logo.png'
export const Navbar = () => {
  return (
    <nav className='container'>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Dashboard</li>
            <li>Agents</li>
            <li>Candidates</li>
            <li>Create Agents</li>
            <li>Jobs</li>
            <li>Live calls</li>
            <li>Results</li>
        </ul>
    </nav>
  )
}
