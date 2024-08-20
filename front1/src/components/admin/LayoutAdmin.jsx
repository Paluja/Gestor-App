import React from 'react'
import NavBarAdmin from './NavBarAdmin'
import { Outlet } from 'react-router-dom'

function LayoutAdmin() {
  return (
    <>
        <NavBarAdmin/>
        <Outlet/>
    </>
  )
}

export default LayoutAdmin