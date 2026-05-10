import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
     const token = localStorage.getItem("token");
     const user = JSON.parse(localStorage.getItem("user"))
  if(!(user?.user?.role === 'admin')){
    return <Navigate to="/login" />; 
  }
  return <Outlet />
}

export default PrivateRoutes
