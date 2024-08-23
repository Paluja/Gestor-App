import { Link } from "react-router-dom"
import LogOut from "../LogOut"
function NavBarUser() {
  return (
    <nav>
        <ul>
            <li>
                <Link to="/user/shop">Home</Link>
            </li>
            <li>
                <Link to="/user">Home</Link>
            </li>
            <li>
                <Link to="/user/settings">Settings</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBarUser