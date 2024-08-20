import NavBarUser from "./NavBarUser"
import { Outlet } from "react-router-dom"

function LayoutUser() {
  return (
    <>
        <NavBarUser/>
        <Outlet/>
    </>
  )
}

export default LayoutUser