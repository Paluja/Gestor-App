import { Outlet } from "react-router-dom";
// import { useAuth } from '../../hooks/AuthAdminContext'


function RequireAdminAuth() {
    // const { auth } = useAuth();
    const isAuntenticated = window.localStorage.getItem('auth');
    console.log('AuthAdmin', isAuntenticated);
    return (
      isAuntenticated ? <Outlet /> : <h2>Malas credeenciales</h2>
  )
}

export default RequireAdminAuth