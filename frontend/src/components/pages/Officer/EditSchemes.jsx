import React, { useEffect, useState } from 'react'
import { editScheme, getScheme } from '../../../api/userApi.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditSchemes = () => {
  const { schemeid } = useParams();
  const [scheme, setScheme] = useState({});
  const [selected, setSelected] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedGender,setSelectedGender] = useState([])
  const [maritalstatus,setMaritalStatus] = useState([])
  const categories = ["General", "OBC", "ST", "SC"];
  const requiredDocs =
    ["Aadhar Card", "Voter ID", "Driving License", "Passport", "Pan Card", "High School", "Higher Secondary", "Graduation", "Post Graduation", "Domicile", "Income", "Caste", "Disability", "Marriage"];
  const genderData = ["Male", "Female", 'Other'];
  const maritalStatus = ["Married","Unmarried"];
  // console.log(schemeid);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await getScheme(schemeid);
        console.log(res?.data?.scheme);
        console.log(typeof (res?.data?.scheme?.eligible_category));
        setScheme(res?.data?.scheme);
        setSelected(res?.data?.scheme?.documents)
        setSelectedCategory(res?.data?.scheme?.eligible_category)
        setSelectedGender(res?.data?.scheme?.gender);
        setMaritalStatus(res?.data?.scheme?.marital_status);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])
  const handleScheme = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const docs = formData.getAll("documents");
    const category = formData.getAll("eligibleCategory");
    const gender = formData.getAll("gender")
    const maritalStatus = formData.getAll("maritalStatus");
    formData.delete("eligibleCategory");
    formData.delete("documents");
    formData.delete("gender");
    formData.delete("maritalStatus")
    const categoryJSON = JSON.stringify(category);
    const docsJSON = JSON.stringify(docs);
    const genderJSON = JSON.stringify(gender);
    const maritalJSON = JSON.stringify(maritalStatus);
    formData.append('eligibleCategory', categoryJSON)
    formData.append('documents', docsJSON)
    formData.append('gender',genderJSON);
    formData.append('maritalStatus',maritalJSON)
    formData.append('schemeId', schemeid);
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const res = await editScheme(data);
      console.log(res.data);
      toast.success(res?.data?.message)
      navigate('/adminDashboard')
    }
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message)
      console.log(error?.response?.data || "Error while Editing Scheme : ", error)
    }
  }
  const handleChange = (e) => {
    console.log(e);
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setSelected(prev => [...prev, value]);
      console.log(selected);
    }
    else {
      setSelected(selected.filter(e => e !== value))
    }

  }
  const handleChangeCategory = (e) => {
    console.log(e);
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setSelectedCategory(prev => [...prev, value]);
      // console.log(selected);
    }
    else {
      setSelectedCategory(selectedCategory.filter(e => e !== value))
    }

  }
  const handleChangeGender = (e) => {
    console.log(e);
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setSelectedGender(prev => [...prev, value]);
      // console.log(selected);
    }
    else {
      setSelectedGender(selectedGender.filter(e => e !== value))
    }

  }
  const handleChangeMarital = (e) => {
    console.log(e);
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setMaritalStatus(prev => [...prev, value]);
      // console.log(selected);
    }
    else {
      setMaritalStatus(maritalstatus.filter(e => e !== value))
    }

  }
  return (
    <>
      <div className='container border m-auto mt-5 shadow-2xl border-blue-500 min-h-80 p-5 rounded'>
        <h1 className='font-bold text-4xl mb-5 text-blue-500'>Edit Scheme</h1>
        <form onSubmit={handleScheme}>
          <div className='flex flex-col'>
            <label htmlFor="schemeName" className='font-semibold'>Scheme Name</label>
            <input type="text" className='p-2 block' name="schemeName" id="schemeName" value={scheme.scheme_name}
              onChange={(e) => {
                setScheme({ ...scheme, scheme_name: e.target.value })
              }} placeholder='Scheme Name' required />

            <label htmlFor="minAge" className='font-semibold'>Scheme Eligibility Minimum Age</label>
            <input type="text" className='p-2 block' name="minAge" id="schemeEligibilityAgeMin" placeholder='Minimum Age' required value={scheme.min_age}
              onChange={(e) => {
                setScheme({ ...scheme, min_age: e.target.value })
              }} />
            <label htmlFor="maxAge" className='font-semibold'>Scheme Eligibility Maximum Age</label>
            <input type="text" className='p-2 block' name="maxAge" id="schemeEligibilityAgeMax" placeholder='Maximum Age' required value={scheme.max_age}
              onChange={(e) => {
                setScheme({ ...scheme, max_age: e.target.value })
              }} />
            <label htmlFor="schemeEligibilityGender" className='font-semibold'>Scheme Eligible Gender</label>
            <div className='p-2 container border overflow-y-auto max-h-96 rounded-lg flex flex-col gap-3'>
              {genderData.map((gender)=>{
                return <div>
                <input type='checkbox' value={gender} id={gender} name="gender" className='p-2' checked={selectedGender?.includes(gender)} onChange={handleChangeGender } />
                <label htmlFor={gender} className='p-2'>{gender}</label>
              </div>
              })}
            </div>
            <label htmlFor="marital_status" className='font-semibold'>Marital Status</label>
            <div className='p-2 container border overflow-y-auto max-h-96 rounded-lg flex flex-col gap-3'>
              {maritalStatus?.map(marital => {
                return (<div key={marital}>
                  <input type='checkbox' value={marital} id={marital} name="maritalStatus" className='p-2' onChange={handleChangeMarital} checked={maritalstatus?.includes(marital)} />
                  <label htmlFor={marital} className='p-2'>{marital}</label>
                </div>)
              })}
            </div>
            <label htmlFor="eligibleCategory" className='font-semibold'>Eligibile Category</label>
            <div className='p-2 container border overflow-y-auto max-h-96 rounded-lg flex flex-col gap-3'>
              {categories?.map(category => {
                return (<div key={category}>
                  <input type='checkbox' value={category} id={category} name="eligibleCategory" className='p-2' onChange={handleChangeCategory} checked={selectedCategory?.includes(category)} />
                  <label htmlFor={category} className='p-2'>{category}</label>
                </div>)
              })}
            </div>
            <label htmlFor="qualification" className='p-2 block font-semibold' >Eligible Qualification</label>
            <select name="qualification" id='qualification' className="block mt-3" value={scheme.qualification}
              onChange={(e) => {
                setScheme({ ...scheme, qualification: e.target.value })
              }}>
              <option value="">Select</option>
              <option value="Illiterate">Illiterate</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Higher Secondary">Higher Secondary</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PHD">PHD</option>
            </select>
            <label htmlFor="eligibleOccupation" className='p-2 block font-semibold'>Eligible Occupation</label>
            <select name="eligibleOccupation" className='p-2 block mt-3' value={scheme.eligible_occupation}
              onChange={(e) => {
                setScheme({ ...scheme, eligible_occupation: e.target.value })
              }}>
              <option value="">Occupation</option>
              <option value="Student">Student</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Private Employee">Private Employee</option>
              <option value="Govt Employee">Govt Employee</option>
              <option value="Business">Business</option>
            </select>
            <label htmlFor="income" className='p-2 block font-semibold'>Income</label>
            <select name="income" className="p-2 block" value={scheme.income}
              onChange={(e) => {
                setScheme({ ...scheme, income: e.target.value })
              }}>
              <option value="">Select Income</option>
              <option value="0-3L">0-3L</option>
              <option value="3L-5L">3L-5L</option>
              <option value="5L-10L">5L-10L</option>
              <option value="10L-20L">10L-20L</option>
            </select>
            <label htmlFor="description" className='font-semibold'>Description</label>
            <textarea className='p-2 block h-30 border rounded' name="description" id="description" placeholder='Describe Scheme Details' required value={scheme.description}
              onChange={(e) => {
                setScheme({ ...scheme, description: e.target.value })
              }} />

            <label htmlFor="startDate" className='font-semibold'>Start Date</label>
            <input type="date" className='p-2 block ' name="startDate" id="startDate" required value={scheme.startdate}
              onChange={(e) => {
                setScheme({ ...scheme, startdate: e.target.value })
              }} />

            <label htmlFor="endDate" className='font-semibold'>End Date</label>
            <input type="date" className='p-2 block' name="endDate" id="endDate" value={scheme.enddate}
              onChange={(e) => {
                setScheme({ ...scheme, enddate: e.target.value })
              }} />

            <label htmlFor="government" className='font-semibold'>Government</label>
            <select name="government" id="government" className='p-2 block ' value={scheme.government}
              onChange={(e) => {
                setScheme({ ...scheme, government: e.target.value })
              }}>
              <option value="">Select Scheme Under Government</option>
              <option value="Central Government">Central Government</option>
              <option value="State Government">State Government</option>
            </select>
            <label htmlFor="requiredDocs" className='p-2 mb-3 text-xl font-semibold'>Required Documents</label>
            <div className='p-2 container border overflow-y-auto max-h-96 rounded-lg flex flex-col gap-3'>
              {requiredDocs.map((doc) => {
                return <div>
                  <input type='checkbox' value={doc} id={doc} checked={selected?.includes(doc)} name="documents" className='p-2' onChange={handleChange} />
                  <label htmlFor={doc} className='p-2'>{doc}</label>
                </div>
              })}
            </div>
            <label htmlFor="applyLink" className='font-semibold'>Apply Link</label>
            <input type="text" className='p-2 block' name="applyLink" id="applyLink" value={scheme.applyLink}
              onChange={(e) => {
                setScheme({ ...scheme, applyLink: e.target.value })
              }} placeholder='Apply Link' required />
            <button type="submit" className='bg-blue-600 p-2 rounded mt-3 cursor-pointer'>Update Scheme</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditSchemes
