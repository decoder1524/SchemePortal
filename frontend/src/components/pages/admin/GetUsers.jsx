import React, { useEffect, useState } from 'react'
import { deleteProfile, deleteUser, getProfile, getUser, getUsers } from '../../../api/userApi'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserProfile from './../../UserProfile'
const GetUsers = ({ users, setUsers, allResults }) => {
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(allResults);
    const [showProfile, setShowProfile] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleProfile = async (userId) => {
        try {
            const res = await getProfile(userId);
            setShowProfile(res?.data?.userProfile);
            // console.log(showProfile);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }
    const handleDelete = async (userId) => {
        try {
            const userDelete = await deleteUser(userId);
            if (showProfile.userId === userId) {
                const del = await deleteProfile(userId)
            }
            setUsers(users?.filter(user => user.userId !== userId));
            toast.success(userDelete?.data?.message);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }
    const handleUpdate = (userId) => {
        navigate(`/edit-user/${userId}`)
    }


    return (
        <>
            <div className='container w-full h-10 flex '>
                <input type="text" className='p-2 min-w-100 m-auto border rounded border-blue-300' placeholder='Search user by Email' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='overflow-hidden overflow-x-auto rounded-2xl border-2 border-gray-700 mt-10' >
                <table className='bg-white  m-auto  sm:w-full'>
                    <thead>
                        <tr>
                            <th className='border border-gray-700 p-2 text-white bg-black '>User Id</th>
                            <th className='border border-gray-700 p-2 text-white bg-black '>Email</th>
                            <th className='border border-gray-700 p-2 text-white bg-black '>Role</th>
                            <th className='border border-gray-700 p-2 text-white bg-black '>Eligible</th>
                            <th className='border border-gray-700 p-2 text-white bg-black '>Not Eligible</th>
                            <th className='border border-gray-700 p-2 text-white bg-black '>Reasons</th>
                            <th className='border border-gray-700 p-2 text-white bg-black '>Action</th>
                        </tr>
                    </thead>

                    <tbody >
                        {users && users.length > 0 ? users?.filter(user => user?.email.toLowerCase()?.includes(search.toLowerCase()))?.map((item) => (
                            <tr key={item.userId}>

                                <td className='border border-gray-700 p-2 hover:bg-gray-500 '>{item.userId}</td>
                                <td className='border border-gray-700 p-2 hover:bg-gray-500 '>{item.email}</td>
                                <td className='border border-gray-700 p-2 hover:bg-gray-500 '>{item.role}</td>
                                {allResults?.find(user => user.userId === item.userId) ? allResults
                                    ?.find(user => user.userId === item.userId)?.eligibleScheme.length === 0 ? <td className='border border-gray-700 p-2 hover:bg-gray-500 '>Not Eligible</td> :
                                    <td className='border border-gray-700 p-2 hover:bg-gray-500 font-bold'>{allResults
                                        ?.find(user => user.userId === item.userId)
                                        ?.eligibleScheme
                                        ?.map((scheme,index) => <div key={index}>{index+1}.  {scheme.schemeName} </div> )}</td> : <td className='border border-gray-700 p-2 hover:bg-gray-500 '>Not Eligible</td>}
                                {allResults?.find(user => user.userId === item.userId) ? allResults
                                    ?.find(user => user.userId === item.userId)?.notEligibleScheme.length === 0 ? <td className='border border-gray-700 p-2 hover:bg-gray-500 '>No Schemes</td> :
                                    <td className='border border-gray-700 p-2 hover:bg-gray-500 font-bold'>{allResults
                                        ?.find(user => user.userId === item.userId)
                                        ?.notEligibleScheme
                                        ?.map((scheme,index) => <div key={index}>{index+1}. {scheme.schemeName}</div> )}</td> : <td className='border border-gray-700 p-2 hover:bg-gray-500 '>Profile Not Found</td>}
                                {allResults?.find(user => user.userId === item.userId) ?
                                    <td className='border border-gray-700 p-2 hover:bg-gray-500 font-bold'>{allResults
                                        ?.find(user => user.userId === item.userId)
                                        ?.notEligibleScheme
                                        ?.map(reasons => reasons.reasons.map((reason,index)=> <div key={index}>{index+1}. {reason}</div>))}</td> : <td className='border border-gray-700 p-2 hover:bg-gray-500 '>Profile Not Found</td>}

                                <td className='border border-gray-700 p-2  flex justify-center gap-5    '>
                                    <button className='cursor-pointer bg-blue-700 p-2 rounded hover:bg-blue-400' onClick={() => {
                                        handleProfile(item.userId)
                                        setShowModal(prev => !prev)
                                    }}>View Profile</button>
                                    {user?.user?.role === 'admin' && <>
                                        <button className='cursor-pointer bg-blue-700 p-2 rounded hover:bg-blue-400' onClick={() => {
                                            setShowEditModal(prev => !prev)
                                            handleUpdate(item.userId)
                                        }}>Edit</button>
                                        <button className='cursor-pointer bg-red-500 p-2 rounded hover:bg-red-400' onClick={() => { handleDelete(item.userId) }}>Delete</button>
                                    </>}
                                </td>
                            </tr>

                        )) : (
                            <tr>
                                <td colSpan="4" className='border border-gray-700 p-2 text-center'>No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
            {showModal && (
                Object.keys(showProfile).length > 0 ? (
                    <div className='fixed top-0 left-0 w-screen h-screen bg-black/90 flex justify-center overflow-y-auto'>
                        <div className="card bg-white w-auto h-auto m-auto rounded-lg shadow-2xl p-3  opacity-100">
                            <div className="flex justify-between p-3 text-xl">
                                <div className='title'>Profile</div>
                                <div className="close-btn cursor-pointer" onClick={() => {
                                    setShowModal(prev => !prev)
                                    setShowProfile({})
                                }
                                }>X</div>
                            </div>
                            <div className="profile-card container boder flex justify-center max-h-full gap-3 flex-col">
                                <img src={
                                    showProfile?.profilephoto
                                        ? `http://localhost:3001/uploads/${showProfile.profilephoto}`
                                        : "https://imgs.search.brave.com/3QDBvTILiulxQWmBi7gx3QB8j7NtOpGgAMold8LVAoc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE5/MjIyMjExMi92ZWN0/b3IvcHJvZmlsZS1h/dmF0YXItb2YtYmVh/cmQtbWFuLXdlYXJp/bmctc3VuZ2xhc3Nl/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9ODJldmhBR0hK/VHJhNmtqbFdORHdk/b21xR3VtVWpKb3Fx/dUdKbWJZQ0M1QT0"
                                } className=' h-15 rounded-4xl m-auto' alt="Profile Photo" />
                                <div className="container ">
                                    <label className=' text-cyan-700 font-semibold '>Name</label>
                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.firstName} ${showProfile?.lastName}`} />
                                    <label className=' text-cyan-700 font-semibold '>Age</label>

                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.age}`} />
                                    <label className=' text-cyan-700 font-semibold '>Gender</label>

                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.gender}`} />
                                    <label className=' text-cyan-700 font-semibold '>Date of birth</label>

                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.dob}`} />
                                    <label className=' text-cyan-700 font-semibold '>Category</label>

                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.category}`} />
                                    <label className=' text-cyan-700 font-semibold '>Phone</label>

                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.phone}`} />
                                    <label className=' text-cyan-700 font-semibold '>Minority</label>

                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.minority}`} />
                                    <label className=' text-cyan-700 font-semibold '>Income</label>

                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.income}`} />
                                    <label className=' text-cyan-700 font-semibold '>Qualification</label>

                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.qualification}`} />
                                    <label className=' text-cyan-700 font-semibold '>Occupation</label>

                                    <input type='text' readOnly disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.occupation_status}`} />
                                    <label className=' text-cyan-700 font-semibold '>Address</label>

                                    <textarea disabled className='p-1 border flex m-auto rounded-lg my-2 min-w-96 border-blue-500 shadow-2xl ' value={`${showProfile?.street} ${showProfile?.city} ${showProfile?.landmark} ${showProfile?.pincode} ${showProfile?.district} ${showProfile?.state}`} />
                                </div>
                            </div>
                        </div>
                    </div>) :

                    (<div className='fixed top-0 w-full h-full bg-black opacity-80 flex justify-center'>
                        <div className="card bg-white w-auto h-auto m-auto rounded-lg shadow-2xl p-3 overflow-y-auto">
                            <div className="flex justify-between p-3 text-xl">
                                <div className='title'>Profile</div>
                                <div className="close-btn cursor-pointer" onClick={() => {
                                    setShowModal(prev => !prev)
                                    setShowProfile({})
                                }
                                }>X</div>
                            </div>
                            <h1 className='text-2xl '>Profile Not Found</h1>
                        </div>
                    </div>)
            )
            }

        </>
    )
}

export default GetUsers
