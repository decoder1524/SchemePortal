import React, { useEffect, useState } from 'react'
import { getSchemes, deleteScheme, getProfileIds, postEligibleData, checkEligibleScheme } from '../../../api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Schemes = ({ schemes, setSchemes }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  // console.log(user?.user?.role);
  const navigate = useNavigate();
  const [allSchemes, setAllSchemes] = useState(schemes)
  const handleDelete = async (schemeid) => {
    try {
      const res = await deleteScheme(schemeid);
      console.log(res.data);
      toast.success(res?.data?.message)
      const updatedSchemes = allSchemes.filter(scheme => scheme.schemeid !== schemeid)
      setSchemes(updatedSchemes);
      setAllSchemes(updatedSchemes)
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (schemeid) => {
    navigate(`/edit-scheme/${schemeid}`)
  };
  const handleGetScheme = (schemeid) => {
    console.log(schemeid);
    navigate(`/get-scheme/${schemeid}`)
  };
   const handleChange = (e) => {
        const value = e.target.value;
        if (value === 'all') {
            setSchemes(allSchemes);
            return;
        }
        const filteredSchemes = allSchemes.filter(
            scheme => scheme?.government.toLowerCase() === value.toLowerCase()
        );
        setSchemes(filteredSchemes);
    };


  return (

    <>
      <div className='container w-full h-10 flex '>
        
        <select name="filter" id="filter" className='border border-blue-500 rounded w-60' onChange={handleChange}>
          <option value="all">All</option>
          <option value="state government">State Government Schemes</option>
          <option value="central government">Central Government Schemes</option>
        </select>
      </div>
      <div className="container rounded-2xl m-auto p-3 mt-5 shadow-2xl border border-white">
        {schemes?.length > 0 ?
          (
            <table className='border w-full text-center rounded'>
              <thead>
                <tr className='text-white bg-black'>
                  <th className='border'>S.NO.</th>
                  <th className='border'>Schemes</th>
                  <th className='border'>Action</th>
                </tr>
              </thead>
              <tbody>
                {schemes?.map((scheme, index) => (
                  <tr>
                    <td className='border'>
                      <button>{index + 1}</button>
                    </td>
                    <td className='border'>
                      <button className='cursor-pointer' onClick={() => { handleGetScheme(scheme.schemeid) }}>{scheme.scheme_name}</button>
                    </td>
                    <td className='border'>
                      <button className='m-3 border  w-20 rounded hover:bg-blue-500 cursor-pointer' onClick={() => {
                        handleEdit(scheme.schemeid)
                      }}>Edit</button>
                      <button className='m-3 border  w-20 rounded hover:bg-red-700 cursor-pointer' onClick={() => {
                        handleDelete(scheme.schemeid)
                      }}>Delete</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          : <p className="text-2xl text-center font-bold text-green-400"> No Scheme Found </p>}

      </div>
    </>
  )
}

export default Schemes
