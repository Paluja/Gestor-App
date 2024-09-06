import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMedal, faUserPlus, faListCheck, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'


function NavBarAdmin() {
  return (
    <div className="navigation-bar">
      
      <div className="nav-item">
        <Link to="/admin/add-award" className="nav-link">
        <FontAwesomeIcon className='icon-wrapper' icon={faMedal} />
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/admin/add-tasks" className="nav-link">
        <FontAwesomeIcon className='icon-wrapper' icon={faListCheck} />
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/admin" className="nav-link">
          <FontAwesomeIcon className='icon-wrapper' icon={faHouse} />
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/admin/add-member" className="nav-link">
        <FontAwesomeIcon className='icon-wrapper' icon={faUserPlus} />
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/admin/settings" className="nav-link">
        <FontAwesomeIcon className='icon-wrapper' icon={faArrowRightFromBracket} />
        </Link>
      </div>
    </div>   
  )
}

export default NavBarAdmin