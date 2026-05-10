import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token");
  if(!(token && user)){
    localStorage.clear();
    return <Navigate to="/login" />; 
  }
  return <Outlet />
}

export default ProtectedRoutes
