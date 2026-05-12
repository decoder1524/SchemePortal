import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getProfile, login } from '../api/userApi';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogIn = async (e) => {
    e.preventDefault();
    console.log("HANDLED LOGIN CALLED");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const res = await login(data);
      console.log(res);
      const userId = res?.data?.user?.userId;
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem('user',JSON.stringify(res.data));
        console.log(res.data);
        localStorage.setItem("token", res.data.token)
        toast.success("Login Success");
        e.target.reset();
        try {
          const getUserData = await getProfile(userId);
          console.log(getUserData);
          navigate('/');
        } catch (profileError) {
          navigate('/register-profile')
          console.log("Profile fetch failed", profileError);
        }
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        navigate('/register-profile')
        toast.error(error?.response?.data?.message);
      } else {
        console.log(error);
        
        console.log(error?.response?.data);
        toast.error(error?.response?.data?.message || "Login failed")
      }
    }

  }

  return (

    <>
      <div className='container border border-white min-h-96 w-90 mx-auto mt-16 rounded-2xl shadow-2xl p-4   text-center'>
        <h3 className='text-blue-400 font-bold text-3xl text-center mt-2'>Login</h3>
        <form onSubmit={handleLogIn} >

          <input 
          type="email" 
          placeholder='example@gmail.com' 
          id='email' name='email' 
          className=' mt-14 m-3 w-80 p-2 border border-gray-500 rounded' required />
          <div className="relative m-3 w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              name="password"
              className="w-80  p-2 pr-10 border border-gray-500 rounded"
              required
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          <button type="submit" className='m-3 p-2 bg-blue-500 rounded hover:text-white'>
            Login
          </button>
          <p className='text-center'>Don't have an account? <Link to={'/signup'} className='text-blue-500 underline'>Signup</Link></p>
        </form>
      </div>
    </>
  )
}

export default Login;
