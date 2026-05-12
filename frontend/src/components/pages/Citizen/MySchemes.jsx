import React, { useEffect, useRef, useState } from 'react'
import { getSchemes, deleteScheme, getEligibleScheme, getScheme, postEligibleData } from '../../../api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MySchemes = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [schemes, setSchemes] = useState([]);
  const userId = user?.user?.userId;
    const [allSchemes, setAllSchemes] = useState([]);
  // console.log(user?.user?.userId);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await getEligibleScheme(userId);
        // console.log(res?.data);
        const schemeids = res?.data?.schemeids;
        try {
          const getScheme = await getSchemes();
          // console.log(getScheme?.data);
          const schemesFetched = await getScheme?.data?.scheme?.filter(scheme =>
            schemeids?.includes(scheme.schemeid)
          );
          // console.log(schemesFetched);
          setSchemes(schemesFetched)
          setAllSchemes(schemesFetched);

        } catch (error) {
          console.log(error);

        }

      }
      catch (error) {
        console.log(error);
      }
    })()
  }, [userId])

  const handleGetScheme = (schemeid) => {
    // console.log(schemeid);
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
       <div className='container w-full h-10 flex m-10'>
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
                {schemes?.map((scheme,index) => (
                  <tr >
                  <td className='border'>
                    <button>{index+1}</button>
                  </td>
                  <td className='border p-2'>
                    <button className='cursor-pointer font-bold text-2xl text-blue-500' onClick={()=>{handleGetScheme(scheme.schemeid)}}>{scheme.scheme_name}</button>
                  </td>
                  <td className='border'>
                    <a href={`http://${scheme.applyLink}`} className='m-3 border  w-20 rounded bg-green-400 p-1   hover:bg-green-500 cursor-pointer'>Apply</a>
                    
                  
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

export default MySchemes
