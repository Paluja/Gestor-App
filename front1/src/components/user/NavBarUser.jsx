import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMedal, faUserPlus, faListCheck, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function NavBarUser() {
  return (
    <div className="navigation-bar">
      
      <div className="nav-item">
        <Link to="/user">
            <FontAwesomeIcon className='icon-wrapper' icon={faHouse} />
        </Link>
      </div>
      <div className="nav-item">
      <Link to="/user/settings">
        <FontAwesomeIcon className='icon-wrapper' icon={faArrowRightFromBracket} />
    </Link>
      </div>
    </div> 
  )
}

export default NavBarUser
                

