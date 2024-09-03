import React from 'react'
import NavBarAdmin from './NavBarAdmin'
import { Outlet } from 'react-router-dom'

function LayoutAdmin() {
  return (
    <>
        <Outlet/>
        <NavBarAdmin/>
    </>
  )
}

export default LayoutAdmin