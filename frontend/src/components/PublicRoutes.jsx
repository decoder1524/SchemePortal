import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
 const token = localStorage.getItem("token");
 const user = JSON.parse(localStorage.getItem("user"))
 if(token){
    console.log("public route hits",token);
    
    return <Navigate to="/" replace />
 }
 return <Outlet/>
}

export default PublicRoutes
