import React, { useEffect, useState } from 'react'
import { addScheme, checkEligibleScheme, createUser, deleteProfile, deleteUser, getEligibleUsers, getProfile, getProfileIds, getSchemes, getUser, getUsers, postEligibleData, updateUser } from '../../api/userApi'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import AddUser from '../pages/admin/AddUser'
import EditUser from '../pages/admin/EditUser'
import GetUsers from './admin/GetUsers';
import GetEligibleUsers from './admin/GetEligibleUsers';
import Schemes from './Officer/Schemes';
import AddSchemes from './Officer/AddSchemes';
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [toggleAddUser, setToggleAddUser] = useState(false);
  const [toggleGetUser, setToggleGetUser] = useState(false);
  const [toggleEditUser, setToggleEditUser] = useState(false);
  const [toggleGetEligibleUser, setToggleGetEligibleUser] = useState(false);
  const [toggleAddScheme, setToggleAddScheme] = useState(false);
  const [toggleGetSchemes, setToggleGetSchemes] = useState(false);
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [showProfile, setShowProfile] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState();
  const [userData, setUserData] = useState({})
  const [allResults,setAllResults]  = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      try {
        const res = await getUsers();
        // console.log(res?.data);
        setUsers(res?.data?.users)
        // console.log(users);

      }
      catch (error) {
        console.log(error);
      }
      try {
        const res = await getSchemes();
        // console.log(res?.data?.scheme);
        setSchemes(res?.data?.scheme);

        try {
          const profiles = await getProfileIds();
          // console.log(profiles?.data);
          const profileIds = profiles?.data?.userProfileIds;
          try {
            const checkEligible = await checkEligibleScheme(profileIds)
            // console.log(checkEligible?.data);
            const allResult = checkEligible?.data?.allResult;
            setAllResults(allResult);
            try {
              const postEligible = await postEligibleData(allResult)
              // console.log(postEligible);

            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            console.log(error);

          }
        } catch (error) {
          console.log(error);

        }

      } catch (error) {
        console.log(error);
      }
      try {
        const res = await getEligibleUsers();
        // console.log(res.data);
        setEligibleUsers(res?.data?.eligibleProfiles)
        // console.log(eligibleUsers);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [refresh])
  const handleAddUser = () => {
    setRefresh(true)
    setToggleAddUser(true)
    setToggleGetUser(false)
    setToggleGetEligibleUser(false)
    setToggleAddScheme(false)
    setToggleGetSchemes(false)
    setRefresh(false)
  }
  const handleGetUser = async () => {
    setRefresh(true)
    setToggleGetUser(true)
    setToggleAddUser(false)
    setToggleGetEligibleUser(false)
    setToggleAddScheme(false)
    setToggleGetSchemes(false)
    setRefresh(false)
  }
  const handleEditUser = () => {
    setToggleEditUser(true)
    setRefresh(true)
    setToggleGetUser(false)
    setToggleAddUser(false)
    setToggleGetEligibleUser(false)
    setToggleAddScheme(false)
    setToggleGetSchemes(false)
    setRefresh(false)
  }
  const handleEligibleUser = () => {

    setToggleGetEligibleUser(true)
    setToggleAddUser(false)
    setToggleGetUser(false)
    setToggleAddScheme(false)
    setToggleGetSchemes(false)
  }
  const handleAddScheme = () => {
    setToggleAddUser(false)
    setToggleGetUser(false)
    setToggleGetEligibleUser(false)
    setToggleAddScheme(true)
    setToggleGetSchemes(false)
  }
  const handleGetSchemes = () => {
    setToggleGetSchemes(true);
    setToggleAddUser(false)
    setToggleGetUser(false)
    setToggleGetEligibleUser(false)
    setToggleAddScheme(false)
  }
  return (
    <>
      <div className="container min-h-50 w-full border m-auto mt-5 flex  justify-around shadow-2xl border-blue-400 rounded-2xl gap-5 p-2">
        <div className="box border w-60 h-40 mt-5 rounded-lg shadow-2xl border-white ">
          <p className='text-2xl text-center mt-5 text-blue-500 font-semibold'>Total Users</p>
          <p className='text-2xl text-center mt-5 text-blue-500 font-semibold'>{(users.length) - (users.filter(user => (user.role === 'admin').length))}</p>
        </div>
        <div className="box border w-60 h-40 mt-5 rounded-lg shadow-2xl border-white ">
          <p className='text-2xl text-center mt-5 text-blue-500 font-semibold'>Schemes</p>
          <p className='text-2xl text-center mt-5 text-blue-500 font-semibold'>{schemes.length}</p>
        </div>
        <div className="box border w-60 h-40 mt-5 rounded-lg shadow-2xl border-white ">
          <p className='text-2xl text-center mt-5 text-blue-500 font-semibold'>Eligible Users</p>
          <p className='text-2xl text-center mt-5 text-blue-500 font-semibold'>{eligibleUsers.length}</p>
        </div>
        <div className="box border w-60 h-40 mt-5 rounded-lg shadow-2xl border-white ">
          <p className='text-2xl text-center mt-5 text-blue-500 font-semibold'>Ineligible Users</p>
          <p className='text-2xl text-center mt-5 text-blue-500 font-semibold'>{users.length - eligibleUsers.length}</p>
        </div>
      </div>
      <div className='  m-5 min-h-90  rounded-2xl'>
        {user?.user?.role === 'admin' && 
         <div className=' mt-10 flex gap-2 pl-2 justify-around'>
          <button className='rounded p-2 bg-blue-500 w-60' onClick={handleAddUser}>Add User</button>
          <button className='rounded p-2 bg-blue-500 w-60' onClick={handleGetUser}>Get Users</button>
          <button className='rounded p-2 bg-blue-500 w-60' onClick={handleGetSchemes}>Schemes</button>
          <button className='rounded p-2 bg-blue-500 w-60' onClick={handleAddScheme}>Add Schemes</button>
          <button className='rounded p-2 bg-blue-500 w-60' onClick={handleEligibleUser}>Eligible Users</button>
        </div> }
        {user?.user?.role === 'officer' &&
        <div className=' mt-10 flex gap-2 pl-2 justify-around'>
          <button className='rounded p-2 bg-blue-500 w-60' onClick={handleGetUser}>Get Users</button>
          <button className='rounded p-2 bg-blue-500 w-60' onClick={handleGetSchemes}>Schemes</button>
          <button className='rounded p-2 bg-blue-500 w-60' onClick={handleAddScheme}>Add Schemes</button>
          <button className='rounded p-2 bg-blue-500 w-60' onClick={handleEligibleUser}>Eligible Users</button>
        </div>}
        <div className='  m-5 p-5 shadow-blue-700'>
          {toggleAddUser &&  <AddUser setRefresh={setRefresh}/>}
          {toggleGetUser && <GetUsers users={users} setUsers={setUsers} allResults = {allResults} />}
          {toggleGetSchemes && <Schemes schemes={schemes} setSchemes={setSchemes} setUsers={setUsers} />}
          {toggleAddScheme &&<AddSchemes setSchemes = {setSchemes} />}
          {toggleGetEligibleUser && <GetEligibleUsers eligibleUsers = {eligibleUsers}/>}
          {toggleEditUser && <EditUser/>}
        </div>
      </div>
    </>
  )
}

export default Dashboard
