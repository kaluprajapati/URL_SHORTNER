import React from 'react'
import { Outlet, useLocation } from '@tanstack/react-router'
import Navbar from './components/NavBar'

const RootLayout = () => {
  const location = useLocation()
  const hideNavbar = location.pathname === '/redirect'

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  )
}

export default RootLayout