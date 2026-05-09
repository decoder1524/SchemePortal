import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const OfficerRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token");
  if (!(user?.user?.role === 'admin' || user?.user?.role === 'officer')) {
    return <Navigate to="/login" />;
  }
  return <Outlet />
}

export default OfficerRoutes
