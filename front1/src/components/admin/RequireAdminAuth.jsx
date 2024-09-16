import { Outlet } from "react-router-dom";
import { useAuth } from '../../hooks/AuthAdminContext'


function RequireAdminAuth() {
    const { auth } = useAuth();
    const isAuntenticated = window.localStorage.getItem('auth');
    console.log('AuthAdmin', isAuntenticated);
    return (
      auth ? <Outlet /> : <h2 className="principalTitle"  >Malas credeenciales</h2>
  )
}

export default RequireAdminAuth