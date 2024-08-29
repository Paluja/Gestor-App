import { Link } from 'react-router-dom'


function NavBarAdmin() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin">Home</Link>
        </li>
        <li>
          <Link to="/admin/tasks">Login</Link>
        </li>
        <li>
          <Link to="/admin/add-award">Add awards</Link>
        </li>
        <li>
          <Link to="/admin/add-member">Add membrer</Link>
        </li>
        <li>
          <Link to="/admin/add-tasks">Add Tasks</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </nav>    
  )
}

export default NavBarAdmin