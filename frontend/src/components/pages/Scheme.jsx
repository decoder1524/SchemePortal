import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getScheme, login } from '../../api/userApi';

const Scheme = () => {
  const navigate = useNavigate();
  const { schemeid } = useParams();
  // console.log(schemeid);
  const [scheme, setScheme] = useState([]);
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await getScheme(schemeid);
        console.log(res.data.scheme);
        setScheme(res.data.scheme);
        const documents = res?.data?.scheme?.documents;
        setDocs(documents)
        console.log(docs);

      } catch (error) {
        console.log(error);
      }
    })()
  }, [])
  const handleApplyForm = ()=>{
    
  }
  return (
    <div className='minw-96 min-h-96 p-4 border bg-blue-300 m-10 shadow-2xl border-green-300 rounded-lg flex gap-2 flex-col'>
      <h1 className='font-bold text-4xl font-serif '>{scheme.scheme_name}</h1>
      <h3 className='font-semibold text-2xl'>Description </h3>
      <div className='border container  p-2 rounded-lg border-green-200 bg-blue-200'>
        <p>{scheme.description}</p>
      </div>
      <h3 className='font-semibold text-2xl'>Important Dates </h3>
      <div className='border container  p-2 rounded-lg border-green-200 bg-blue-200'>
        <p ><b>Start Date : </b> {scheme.startdate}</p>
        <p ><b>End Date : </b> {scheme.enddate}</p>

      </div>
      <h3 className='font-semibold text-2xl'>Eligibility Criteria</h3>
      <div className='border container  p-2 rounded-lg border-green-200 bg-blue-200'>
        <p><b>Minimum Age : </b> {scheme.min_age} </p>
        <p><b>Maximum Age : </b> {scheme.max_age} </p>
        <p><b>Eligible Gender : </b> {scheme?.gender?.map(gender => <p className='ml-2 inline'>{gender}</p>)}</p>
        <p><b>Marital Status : </b> {scheme?.marital_status?.map(marital => <p className='ml-2 inline'>{marital}</p>)}</p>

        <p><b>Eligibile Category : </b> {scheme?.eligible_category?.map(category => <p className='ml-2 inline'>{category}</p>)}</p>
        <p><b>Eligibile Occupation : </b> {scheme.eligible_occupation} </p>
        <p><b> Highest Qualification : </b> {scheme.qualification} </p>
        <p><b> Income : </b> {scheme.income} </p>
        <p><b> Scheme Under  : </b> {scheme.government} </p>

      </div>
      <h3 className='font-semibold text-2xl'>Required Documents</h3>
      <div className='border container  p-2 rounded-lg border-green-200 bg-blue-200'>
        <p>{docs.map(doc => <p className='ml-10'>{doc}</p>)}</p>
      </div>
          <a href={`http://${scheme.applyLink}`} className='bg-green-500 p-2 m-auto rounded-md w-30 mt-3 hover:bg-green-400 hover:text-white text-center ' target='_blank' >Apply</a>
    </div>
  )
}

export default Scheme;
