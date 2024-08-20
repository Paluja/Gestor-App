import { Outlet } from "react-router-dom";
import { useAuth } from '../../hooks/AuthAdminContext'


function RequireAdminAuth() {
    const { auth } = useAuth();
    return (
      auth ? <Outlet /> : <h2>Malas credeenciales</h2>
  )
}

export default RequireAdminAuth