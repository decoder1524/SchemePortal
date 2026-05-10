import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../api/userApi';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  // console.log(user);
  
  console.log(user);
  const [userData, setUserData] = useState({})
  useEffect(() => {
    const data = async () => {
      try {
        const res = await getProfile(user.user.userId);
        // console.log(res);
        const userProfile = res?.data?.userProfile;
        // console.log(userProfile);
        setUserData(userProfile);
      } catch (error) {
        console.log(error);
      }

    }
    data();
  }, [])

  return (
    <>
      <div className="container mt-7 m-auto border max-sm:w-80 max-w-3xl p-4  rounded-3xl shadow-2xl  border-green-500">
        <h1 className='text-center text-4xl text-blue-600  font-bold' >
          {user?.user?.role === 'admin' || user?.user?.role === 'officer' ? (user?.user?.role === 'officer' ? 'Officer' : 'Admin') : 'Citizen'} Profile</h1>
        <img src={
          userData?.profilephoto
            ? `http://localhost:3001/uploads/${userData.profilephoto}`
            : "https://imgs.search.brave.com/3QDBvTILiulxQWmBi7gx3QB8j7NtOpGgAMold8LVAoc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE5/MjIyMjExMi92ZWN0/b3IvcHJvZmlsZS1h/dmF0YXItb2YtYmVh/cmQtbWFuLXdlYXJp/bmctc3VuZ2xhc3Nl/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9ODJldmhBR0hK/VHJhNmtqbFdORHdk/b21xR3VtVWpKb3Fx/dUdKbWJZQ0M1QT0"
        } className=' h-20 rounded-4xl m-auto mt-5  ' alt="Profile Photo" />

        <div className="container ">
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Name</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.firstName} ${userData?.lastName}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Email</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${user?.user?.email}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Age</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.age}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Gender</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.gender}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Marital Status</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.marital_status}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Date of birth</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.dob}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Category</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.category}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Phone</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.phone}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Minority</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.minority}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Income</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.income}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Qualification</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.qualification}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Occupation Status</label>
          <input type='text' readOnly disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70' value={`${userData?.occupation_status}`} />
          <label className='ml-45 text-cyan-700 font-semibold max-sm:m-0'>Address</label>

          <textarea disabled className='p-2 border flex m-auto rounded-lg my-2 w-96 border-blue-500 shadow-2xl max-sm:w-70 ' value={`${userData?.street} ${userData?.city} ${userData?.landmark} ${userData?.pincode} ${userData?.district} ${userData?.state}`} />

        </div>
        <button className='p-2 bg-blue-500 rounded-lg m-auto flex mt-5 hover:text-white '><Link to={'/edit-profile'} >Edit Profile</Link></button>

      </div>
    </>
  )
}


export default UserProfile
