import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { changePassword, sendRegistrationMail } from '../api/userApi';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';


const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const navigate = useNavigate();
    const handleChangePassword = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        changePassword(data).then(async (res) => {
            console.log(res);
            if (res.status === 200 || res.status === 201) {
                toast.success("Password change Successfully")
                e.target.reset();
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message)
            if (err?.response?.status === 409) {
                const message = err?.response?.data?.message;
                toast.error(message)
                return;
            }

        })
    }
        return (
            <div className='container border border-white min-h-96 w-90 mx-auto mt-16 rounded-2xl shadow-2xl p-4  text-center'>
                <h3 className='text-blue-400 font-bold text-3xl text-center mt-2'> Change Password</h3>
                <form onSubmit={handleChangePassword}>
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
                            placeholder='Old Password'
                            id='password'
                            name='oldPassword'
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
                            type={showNewPassword ? "text" : "password"}
                            placeholder='New password'
                            id='Newpassword'
                            name='password'
                            className=' w-80 m-3 p-2 pr-10 border border-gray-500 rounded'
                            required
                        />
                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-lg"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                    </div>
                    <div className='relative w-full'>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder='Confirm password'
                            id='confirmPassword'
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
                        value="Change"
                        className='m-3 p-2 bg-blue-500 rounded hover:text-white' />
            
                </form>


            </div>
        )
    }


    export default ChangePassword
