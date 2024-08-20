import { Link } from 'react-router-dom'

function NavBarAdmin() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin/home">Home</Link>
        </li>
        <li>
          <Link to="/admin/tasks">Login</Link>
        </li>
        <li>
          <Link to="/admin/awards">Register</Link>
        </li>
        <li>
          <Link to="/admin/add-member">Add membrer</Link>
        </li>
        <li>
          <Link to="/admin/settings">Register</Link>
        </li>
      </ul>
    </nav>    
  )
}

export default NavBarAdmin