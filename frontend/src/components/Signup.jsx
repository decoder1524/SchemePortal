import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { register, sendRegistrationMail } from '../api/userApi';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    register(data).then(async (res) => {
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        toast.success("Registered Successfully")
        localStorage.setItem('user',JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);
        console.log(res.data.user);
        navigate("/register-profile");
        const data = {
          to: res?.data?.user?.email,
          name: res?.data?.user?.role
        }
        try {
          const notify = await sendRegistrationMail(data);
          console.log(notify);

        } catch (error) {
          console.log(error);

        }
      }
    }).catch((err) => {
      console.log(err.response.data);

      if (err?.response?.status === 409) {
        const message = err?.response?.data?.message;
        toast.error(message)
        return;
      }
      const messages = err?.response?.data?.message
      if (messages) {
        messages.forEach(element => {
          toast.error(element)
        });
      } else {
        toast.error(err?.response?.data?.message || "Registration failed")
      }

    })

  }

  return (
    <div className='container border border-white min-h-96 w-90 mx-auto mt-16 rounded-2xl shadow-2xl p-4  text-center'>
      <h3 className='text-blue-400 font-bold text-3xl text-center mt-2'> Signup</h3>
      <form action="/" onSubmit={handleSignUp} method="post">
        <input
          type="email"
          placeholder='example@gmail.com'
          id='email'
          name='email'
          className=' mt-14 w-80 m-2 p-2 pr-10 border border-gray-500 rounded'
          required />
          <div className='relative  w-full'>
        <input
          type={showPassword ? "text" : "password"}
          placeholder='Password'
          id='password'
          name='password'
          className='w-80 m-3 p-2 pr-10 border border-gray-500 rounded'
          required
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-lg"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </span>

          </div>
          <div className='relative w-full'>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder='Confirm password'
          id='confirmpassword'
          name='confirmPassword'
          className=' w-80 m-3 p-2 pr-10 border border-gray-500 rounded'
          required
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-lg"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </span>

          </div>
        <input
          type="submit"
          value="Register"
          className='m-3 p-2 bg-blue-500 rounded hover:text-white' />
        <p className='text-center'>Already have a account? <Link to={'/login'} className='text-blue-500 underline'>Login</Link></p>
      </form>


    </div>
  )
}

export default Signup
