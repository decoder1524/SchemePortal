import React, { useState } from 'react'
import { addScheme } from '../../../api/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddSchemes = ({setRefresh}) => {
  const navigate = useNavigate();
  const requiredDocs = ["Aadhar Card", "Voter ID", "Driving License", "Passport", "Pan Card", "High School", "Higher Secondary", "Graduation", "Post Graduation", "Domicile", "Income", "Caste", "Disability", "Marriage"];
      const categories = ["General", "OBC", "ST", "SC"];
      const genderData = ["Male","Female",'Other'];
      const maritalStatus = ["Married","Unmarried"];
  const handleScheme = async (event) => {
     setRefresh(true)
    event.preventDefault();
    const formData = new FormData(event.target);
    const docs = formData.getAll("documents");
    const category = formData.getAll("eligibleCategory");
    const gender = formData.getAll("gender");
    const marital = formData.getAll("maritalStatus")
    const categoryJSON = JSON.stringify(category);
    const docsJSON = JSON.stringify(docs);
    const genderJSON = JSON.stringify(gender);
    const maritalJSON = JSON.stringify(marital);
    formData.append('eligibleCategory', categoryJSON)
    formData.append('documents', docsJSON);
    formData.append('gender', genderJSON);
    formData.append("maritalStatus",maritalJSON)
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const res = await addScheme(data);
      console.log(res.data);
      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.message)
        event.target.reset(); 
        setRefresh(false)
      }

    }
    catch (error) {
      if (error) {
        toast.error(error?.response?.data?.message)
      }
      console.log(error?.response?.data || "Error while Posting Data : ", error)
    }
  }
  
  return (
    <>
      <div className='container border m-auto mt-5 shadow-2xl border-blue-500 min-h-80 p-5 rounded'>
        <h1 className='font-bold text-4xl mb-5 text-blue-500'>Add Scheme</h1>
        <form action="/add-scheme" method="post" onSubmit={handleScheme}>
          <div className='flex flex-col'>
            <label htmlFor="schemeName" className='font-semibold'>Scheme Name</label>
            <input type="text" className='p-2 block' name="schemeName" id="schemeName" placeholder='Scheme Name' required />

            <label htmlFor="schemeEligibilityAgeMax" className='font-semibold'>Scheme Eligibility Minimum Age</label>
            <input type="text" className='p-2 block' name="minAge" id="schemeEligibilityAgeMin" placeholder='Minimum Age' required />
            <label htmlFor="schemeEligibilityAgeMax" className='font-semibold'>Scheme Eligibility Maximum Age</label>
            <input type="text" className='p-2 block' name="maxAge" id="schemeEligibilityAgeMax" placeholder='Maximum Age' required />
            <label htmlFor="schemeEligibilityGender" className='font-semibold'>Scheme Eligible Gender</label>
            <div className='p-2 container border overflow-y-auto max-h-96 rounded-lg flex flex-col gap-3'>
              {genderData.map((gender)=>{
                return <div key={gender}>
                <input type='checkbox' value={gender} id={gender} name="gender" className='p-2' />
                <label htmlFor={gender} className='p-2'>{gender}</label>
              </div>
              })}
            </div>
            
            <label htmlFor="marital_status" className='font-semibold'>Marital Status</label>
            <div className='p-2 container border overflow-y-auto max-h-96 rounded-lg flex flex-col gap-3'>
              {maritalStatus.map((marital)=>{
              return <div key={marital}>
                <input type='checkbox' value={marital} id={marital} name="maritalStatus" className='p-2' />
                <label htmlFor={marital} className='p-2'>{marital}</label>
              </div>
              })}
            </div>
            <label htmlFor="eligibleCategory" className='font-semibold'>Eligibile Category</label>
            <div className='p-2 container border overflow-y-auto max-h-96 rounded-lg flex flex-col gap-3'>
              {categories.map((category)=>{
              return <div key={category}>
                <input type='checkbox' value={category} id={category} name="eligibleCategory" className='p-2' />
                <label htmlFor={category} className='p-2'>{category}</label>
              </div>
              })}
            </div>
            <label htmlFor="qualification" className='p-2 block font-semibold'>Eligible Qualification</label>
            <select name="qualification" className="block mt-3 p-2">
              <option value="">Select</option>
              <option value="Illiterate">Illiterate</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Higher Secondary">Higher Secondary</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PHD">PHD</option>
            </select>
            <label htmlFor="eligibleOccupation" className='block font-semibold'>Eligible Occupation</label>
            <select name="eligibleOccupation" className='p-2 block mt-3'>
              <option value="">Occupation</option>
              <option value="Student">Student</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Private Employee">Private Employee</option>
              <option value="Govt Employee">Govt Employee</option>
              <option value="Business">Business</option>
            </select>
            <label htmlFor="income" className='p-2 block font-semibold'>Income</label>
            <select name="income" id='income' className="p-2 block">
              <option value="">Select Income</option>
              <option value="0-3L">0-3L</option>
              <option value="3L-5L">3L-5L</option>
              <option value="5L-10L">5L-10L</option>
              <option value="10L-20L">10L-20L</option>
            </select>
            <label htmlFor="description" className='font-semibold'>Description</label>
            <textarea className='p-2 block h-30 border rounded' name="description" id="description" placeholder='Describe Scheme Details' required />
            <label htmlFor="startDate" className='font-semibold'>Start Date</label>
            <input type="date" className='p-2 block ' name="startDate" id="startDate" required />
            <label htmlFor="endDate" className='font-semibold'>End Date</label>
            <input type="date" className='p-2 block ' name="endDate" id="startDate" placeholder='Annual income Minimum' required />
            <label htmlFor="government" className='font-semibold'>Government</label>
            <select name="government" id="government" className='p-2 block '>
              <option value="">Select Scheme Under Government</option>
              <option value="Central Government">Central Government</option>
              <option value="State Government">State Government</option>
            </select>
            <label htmlFor="requiredDocs" className='p-2 mb-3 text-xl font-semibold'>Required Documents</label>
            <div className='p-2 container border overflow-y-auto max-h-96 rounded-lg'>
              {requiredDocs.map((doc) => {
                return <div>
                  <input type='checkbox' value={doc} id={doc} name="documents" className='p-2' />
                  <label htmlFor={doc} className='p-2'>{doc}</label>
                </div>
              })}
            </div>
             <label htmlFor="schemeName" className='font-semibold'>Apply Link</label>
              <input type="text" className='p-2 block' name="applyLink" id="applyLink" placeholder='Apply Link' required />
            <button type="submit" className='bg-blue-600 p-2 rounded mt-3 '>Add Scheme</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddSchemes
