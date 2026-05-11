import React from 'react'
import { createUser } from '../../../api/userApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddUser =  ({setRefresh}) => {
  const navigate = useNavigate();
  const handleCreate = async (e)=>{
    e.preventDefault();
    setRefresh(true)
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    try {
      const res = await createUser(data);
      console.log(res.data);
      toast.success(res?.data?.message );
      setRefresh(false)
      e.target.reset();
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className='container border m-auto w-75 mt-5 shadow-2xl border-blue-500 min-h-80 p-5 rounded'>
        <h1 className='text-center font-bold text-4xl mb-5 text-blue-500'>Add User</h1>
      <form method="post" onSubmit={handleCreate}>
        <input type="email" className='p-2 block w-full ' name="email" id="email" placeholder='Enter Email' required />
        <input type="password" className='p-2 block' name="password" id="password" placeholder='Enter Password' required/>
        <input type="password"  className='p-2 block' name="confirmPassword" id="cpassword" placeholder='Enter Confirm Password' required/>
        <select name="role"  className='p-2 block' id="role">
            <option value="">select</option>
            <option value="admin">Admin</option>
            <option value="citizen">Citizen</option>
            <option value="officer">Department Officer</option>
        </select>
        <button type="submit" className='bg-blue-600 p-2 rounded cursor-pointer'>Add User</button>
      </form>
    </div>
  )
}

export default AddUser
