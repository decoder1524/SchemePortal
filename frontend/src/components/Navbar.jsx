import React, { useState } from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  // console.log("From Navbar Frontend ", user?.isLoggedIn);
  // console.log("From Navbar Frontend ", user?.user?.role);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    API.post("/logout").then((res) => {
      console.log(res.data);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate('/login');
    }).catch((err) => {
      console.log(err);
    });
  }
  const [open, setOpen] = useState(false);
  return (
    <div className='bg-blue-100 shadow-2xl mt-2  w-full'>
      <nav>
        <ul className='flex p-4 gap-3'>
          <li className='font-bold font-serif text-2xl hover:text-white '><Link to={'/'}>myScheme</Link></li>
          <div className='flex max-sm:hidden'>
            {user?.user?.role === 'citizen' && (
              <div className=' flex  space-x-3 '>
                <li className='hover:text-white'><Link to={'/'}>Home</Link></li>
                <li className='hover:text-white' ><Link to={'/get-myscheme'}>My Schemes</Link></li>
                <li className='hover:text-white rounded text-2xl text-center'><Link to={'/user-profile'}><FaUserLarge /></Link></li>
                <li className='hover:text-black'><Link to={'/change-password'} className='ml-auto hover:bg-white rounded px-2 text-right'>Change Password</Link></li>
              </div>
            )}
            {user?.user?.role === 'officer' && (
              <div className=' flex  space-x-3 '>
                <li className='hover:text-white'><Link to={'/adminDashboard'}>Dashboard</Link></li>
                <li className='hover:text-white rounded text-2xl text-center'><Link to={'/user-profile'}><FaUserLarge /></Link></li>
                <li className='hover:text-black'><Link to={'/change-password'} className='ml-auto hover:bg-white rounded px-2 text-right'>Change Password</Link></li>
              </div>
            )}
            {user?.user?.role === 'admin' && (
              <div className='flex px-3 gap-4'>
                <li className='hover:text-white'><Link to={'/adminDashboard'}>Dashboard</Link></li>
                <li className='hover:text-white rounded text-2xl text-center'><Link to={'/user-profile'}><FaUserLarge /></Link></li>
                <li className='hover:text-black'><Link to={'/change-password'} className='ml-auto hover:bg-white rounded px-2 text-right'>Change Password</Link></li>
              </div>
            )}

            {!user?.isLoggedIn && (
              <div className='flex px-3 gap-4 m-auto'  >
                <li className='hover:bg-white rounded px-2 '><Link to={'/signup'}>Signup</Link></li>
                <li className='ml-auto hover:bg-white rounded px-2 ' ><Link to={'/login'}>Login</Link></li>
              </div>
            )}
            {user?.isLoggedIn && (
              <div className='space-y-2 '>
                <Link to={'/login'} className='ml-auto hover:bg-white rounded px-2 text-right' onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}

          </div>
          <div className='ml-auto text-right sm:hidden max-sm:w-full'>
            <button onClick={() => setOpen(!open)} className='text-2xl hover:text-white inline '>&#8801;</button>
            {open && (
              <div className=' space-y-2 '>
                {user?.user?.role === 'citizen' && (
                  <div className='space-y-2'>
                    <li className='hover:text-white'><Link to={'/'}>Home</Link></li>
                    <li className='hover:text-white' ><Link to={'/get-myscheme'}>My Schemes</Link></li>
                    <li className=' hover:text-white rounded'><Link to={'/user-profile'}>Profile</Link></li>
                    <li className='hover:text-black'><Link to={'/change-password'} className='ml-auto hover:bg-white rounded px-2 text-right'>Change Password</Link></li>
                  </div>
                )}
                {user?.user?.role === 'admin' && (
                  <div className='  space-y-2 '>
                    <li className='hover:text-white'><Link to={'/adminDashboard'}>Dashboard</Link></li>
                    <li className=' hover:text-white rounded'><Link to={'/user-profile'}>Profile</Link></li>
                    <li className='hover:text-black'><Link to={'/change-password'} className='ml-auto hover:bg-white rounded px-2 text-right'>Change Password</Link></li>
                  </div>
                )}
                {user?.user?.role === 'officer' && (
                  <div className=' flex  space-x-3 '>
                   
                    <li className='hover:text-white'><Link to={'/adminDashboard'}>Dashboard</Link></li>
                    <li className='hover:text-white rounded text-2xl text-center'><Link to={'/user-profile'}><FaUserLarge /></Link></li>
                    <li className='hover:text-black'><Link to={'/change-password'} className='ml-auto hover:bg-white rounded px-2 text-right'>Change Password</Link></li>
                  </div>
                )}

                {!(user?.isLoggedIn) && (
                  <div className='space-y-2 '>
                    <li className='ml-auto hover:bg-white rounded px-2 text-right' ><Link to={'/login'}>Login</Link></li>
                    <li className=' hover:bg-white rounded px-2 text-right'><Link to={'/signup'}>Signup</Link></li>
                  </div>

                )}
                {user?.isLoggedIn && (
                  <div className='space-y-2 '>
                
                    <Link to={'/login'} className='ml-auto hover:bg-white rounded px-2 text-right' onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}

              </div>
            )}
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
