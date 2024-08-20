import { Outlet } from "react-router-dom"
import { useAuthUser } from "../../hooks/UserContext"


function RequireUserAuth() {
  const { auth } = useAuthUser();
  
  return (
    auth ? <Outlet /> : <h2>Malas credenciales</h2>
  )
}

export default RequireUserAuth