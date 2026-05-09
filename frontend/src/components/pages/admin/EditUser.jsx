import React, { useEffect, useState } from 'react'
import { createUser, getUser, updateUser } from '../../../api/userApi'
import { toast } from 'react-toastify'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const EditUser =  () => {
  const navigate = useNavigate()
  const [userData,setUserData] = useState({})
  const{ userId }= useParams(); ;
      useEffect(() => {
          (async () => {
              try {
                  const res = await getUser(userId);
                  console.log(res?.data);
                  setUserData(res?.data?.user)                  
              }
              catch (error) {
                  console.log(error);
              }
          })()
      }, [])
  const handleEdit = async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    try {
      const res = await updateUser(userId,data);
      console.log(res.data);
      toast.success(res?.data?.message );
      navigate('/adminDashboard');
    } catch (error) {
      console.log(error?.response?.data?.message?.[0]);
      toast.error(error?.response?.data?.message?.[0])
    }
  }

  return (
    <div className='container border m-auto w-75 mt-5 shadow-2xl border-blue-500 min-h-80 p-5 rounded'>
        <h1 className='text-center font-bold text-4xl mb-5 text-blue-500'>Edit User</h1>
      <form onSubmit={handleEdit}>
        <input type="email" className='p-2 block w-full ' name="email" id="email" placeholder='Enter Email' required value={userData?.email || ""} onChange={(e)=>{
          setUserData(prev =>({
          ...prev,email :e.target.value
        }))}} />
        <select name="role"  className='p-2 block' id="role"value={userData?.role || ""} onChange={(e)=>{
          setUserData(prev =>({
          ...prev,role :e.target.value
        }))}} >
            <option value="">select</option>
            <option value="admin">Admin</option>
            <option value="citizen">Citizen</option>
            <option value="officer">Department Officer</option>
        </select>
        <button type="submit" className='bg-blue-600 p-2 rounded '>Edit User</button>
      </form>
    </div>
  )
}

export default EditUser
