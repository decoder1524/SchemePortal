import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import UserProfile from './components/UserProfile'
import CreateProfile from './components/CreateProfile'
import Herosection from './components/Herosection'
import AddUser from './components/pages/admin/AddUser'
import ContactUs from './components/pages/Citizen/ContactUs'
import AboutUs from './components/pages/Citizen/AboutUs'
import AddSchemes from './components/pages/Officer/AddSchemes'
import GetUsers from './components/pages/admin/GetUsers'
import Schemes from './components/pages/Officer/Schemes'
import EditProfile from './components/EditProfile'
import ProtectedRoutes from './components/ProtectedRoutes'
import EditSchemes from './components/pages/Officer/EditSchemes'
import Scheme from './components/pages/Scheme'
import EditUser from './components/pages/admin/EditUser'
import MySchemes from './components/pages/Citizen/MySchemes'
import Dashboard from './components/pages/Dashboard'
import GetEligibleUsers from './components/pages/admin/getEligibleUsers'
import PrivateRoutes from './components/PrivateRoutes'
import PublicRoutes from './components/PublicRoutes'
import OfficerRoutes from './components/OfficerRoutes'
import ChangePassword from './components/ChangePassword'
function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Herosection />} />
        <Route path='/logout' element={<Herosection />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route element={<PublicRoutes />} >
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/add-user' element={<AddUser />} />
            <Route path='/edit-user/:userId' element={<EditUser />} />
          </Route>
          <Route element={<OfficerRoutes />}>
            <Route path='/add-scheme' element={<AddSchemes />} />
            <Route path='/edit-scheme/:schemeid' element={<EditSchemes />} />
            <Route path='/get-users' element={<GetUsers />} />
            <Route path='/schemes' element={<Schemes />} />
            <Route path='/get-eligible-users' element={<GetEligibleUsers />} />
            <Route path='/admindashboard' element={<Dashboard />} />
          </Route>
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/register-profile' element={<CreateProfile />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/get-scheme/:schemeid' element={<Scheme />} />
          <Route path='/get-myscheme' element={<MySchemes />} />
        </Route>
      </Routes >
    </>
  )
}

export default App
