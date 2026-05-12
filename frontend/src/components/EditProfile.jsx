import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { editProfile, getProfile } from '../api/userApi';

const EditProfile = () => {
const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();
  // console.log(user);
  const [age, setAge] = useState("");
  const handleAge = (date) => {
    const birthYear = date?.split('-')[0]
    const currentYear = new Date().getFullYear()
    const finalAge = currentYear - Number(birthYear)
    setAge(finalAge)
    console.log(finalAge);  

  }
  const [userFormData, setUserFormData] = useState(
    {
      profilePhoto: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      marital_status: "",
      DOB: "",
      phone: "",
      category: "",
      minority: "",
      street: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
      landmark: "",
      qualification: "",
      occupation_status: ""
    })
  useEffect(() => {
    const data = async () => {
      try {

        const userId = user.user.userId;
        const res = await getProfile(userId);
        // console.log(res);
        const userProfile = res?.data?.userProfile;
        // console.log(userProfile);
        setUserFormData({
          profilePhoto: userProfile?.profilephoto,
          firstName: userProfile?.firstName,
          lastName: userProfile?.lastName,
          age: Number(userProfile?.age),
          gender: userProfile?.gender,
          marital_status: userProfile?.marital_status,
          DOB: userProfile?.dob,
          phone: userProfile?.phone,
          category: userProfile?.category,
          minority: userProfile?.minority,
          income: userProfile?.income,
          street: userProfile?.street,
          city: userProfile?.city,
          district: userProfile?.district,
          state: userProfile?.state,
          pincode: userProfile?.pincode,
          landmark: userProfile?.landmark,
          qualification: userProfile?.qualification,
          occupation_status: userProfile?.occupation_status

        });
        setAge(Number(userProfile?.age))
      } catch (error) {
        console.log(error);

      }

    }
    data();
  }, []);
  const [file, setFile] = useState("");
  const [error, setError] = useState([]);
  const handleFile = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0])
  }
  const handleProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userId = user.user.userId;
    formData.delete("age")
    formData.append("age",Number(age));
    // console.log(user);
    console.log(formData);
    try {
      const res = await editProfile(userId, formData);
      console.log(res.data);
      navigate('/user-profile')
    } catch (error) {
      console.log(error?.response?.data);
      const messages = error?.response?.data?.message?.details
      setError(messages)
      console.log(error.response.data.message.details);
    }

  }
  return (
    <>
      <div className="container mt-7 m-auto border max-sm:w-fit max-w-3xl p-4  rounded-3xl shadow-2xl  border-green-500">
        <h1 className='text-center text-4xl text-blue-600  font-bold' >Edit Profile</h1>
        {error?.length > 0 && <div className='container border shadow-2xl p-4 rounded'>
          <h2>Errors: </h2>
          <ul >
            {error?.map((element) => {
              return <li className='text-red-700 font-semibold text-sm list-disc ml-10 ' >{element.message}</li>
            })
            }

          </ul>
        </div>}
        <div className="container flex justify-center mt-4 ">
          <form action={'/edit-profile'} method='POST' onSubmit={handleProfile} className="space-y-8" encType="multipart/form-data" >
            <img src={
              userFormData?.profilePhoto
                ? `http://localhost:3001/uploads/${userFormData.profilePhoto}`
                : "https://imgs.search.brave.com/3QDBvTILiulxQWmBi7gx3QB8j7NtOpGgAMold8LVAoc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE5/MjIyMjExMi92ZWN0/b3IvcHJvZmlsZS1h/dmF0YXItb2YtYmVh/cmQtbWFuLXdlYXJp/bmctc3VuZ2xhc3Nl/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9ODJldmhBR0hK/VHJhNmtqbFdORHdk/b21xR3VtVWpKb3Fx/dUdKbWJZQ0M1QT0"
            } className=' h-20 rounded-4xl m-auto mt-5  ' alt="Profile Photo" />
            <input type="file" name="profilePhoto" id="profilePhoto" accept='image/*' onChange={handleFile} hidden />
            <label htmlFor="profilePhoto" className='p-2 bg-blue-500 rounded-lg m-auto flex mt-5 w-30 justify-center hover:text-white '>Change Photo</label>

            {/* 🔹 Personal Details */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Personal Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <input name="firstName" type="text" placeholder="First Name" className="input" value={userFormData.firstName} onChange={(e) =>
                  setUserFormData({ ...userFormData, firstName: e.target.value })
                } />
                <input name="lastName" type="text" placeholder="Last Name" className="input" value={userFormData.lastName} onChange={(e) =>
                  setUserFormData({ ...userFormData, lastName: e.target.value })
                } />
                <input name="age" type="number" placeholder="Age" className="input bg-gray-300" value={userFormData.age} readOnly onChange={(e) =>
                  setUserFormData({ ...userFormData, age:age })
                } />

                <select name="category" className="input" value={userFormData.category}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, category: e.target.value })
                  }>
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
                <input name="dob" type="date" placeholder="Age" className="input" value={userFormData.DOB} onKeyDown={(e)=>e.preventDefault()} onChange={(e) =>{
                  setUserFormData({ ...userFormData, DOB: e.target.value })
                  handleAge(e.target.value)
                console.log(e.target.value);
                }
                } />
                <input name="phone" type="number" placeholder="Phone" className="input" value={userFormData.phone} onChange={(e) =>
                  setUserFormData({ ...userFormData, phone: e.target.value })
                } />
              </div>

              {/* Gender */}
              <div className="mt-4 flex items-center gap-4">
                <span className="font-medium">Gender:</span>
                <label className="flex items-center gap-1">
                  <input type="radio" name="gender" value="Male" checked={userFormData.gender === "Male"}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, gender: e.target.value })
                    } /> Male
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="gender" value="Female" checked={userFormData.gender === "Female"}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, gender: e.target.value })
                    } /> Female
                </label>
              </div>
              {/* Marital Status */}
              <div className="mt-4 flex items-center gap-4">
                <span className="font-medium">Marital Status:</span>
                <label className="flex items-center gap-1">
                  <input type="radio" name="marital_status" value="Married" checked={userFormData.marital_status === "Married"}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, marital_status: e.target.value })
                    } /> Married
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="marital_status" value="Unmarried" checked={userFormData.marital_status === "Unmarried"}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, marital_status: e.target.value })
                    } /> Unmarried
                </label>
              </div>
              {/* Minority */}
              <div className="mt-4 flex items-center gap-4">
                <span className="font-medium">Do you belongs to Minority :</span>
                <label className="flex items-center gap-1">
                  <input type="radio" name="minority" value="yes" checked={userFormData.minority === "yes"}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, minority: e.target.value })
                    } /> Yes
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="minority" value="no" checked={userFormData.minority === "no"}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, minority: e.target.value })
                    } /> No
                </label>
              </div>
            </div>
            {/* Income */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Income
              </h2>
              <select name="income" className="input" value={userFormData.income}
                onChange={(e) =>
                  setUserFormData({ ...userFormData, income: e.target.value })
                }>
                <option value="">Select Income</option>
                <option value="0-3L">0-3L</option>
                <option value="3L-5L">3L-5L</option>
                <option value="5L-10L">5L-10L</option>
                <option value="10L-20L">10L-20L</option>
              </select>
            </div>
            {/* Address */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Address
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <input name="street" type="text" placeholder="Street" className="input" value={userFormData.street} onChange={(e) =>
                  setUserFormData({ ...userFormData, street: e.target.value })
                } />
                <input name="city" type="text" placeholder="City" className="input" value={userFormData.city} onChange={(e) =>
                  setUserFormData({ ...userFormData, city: e.target.value })
                } />
                <input name="district" type="text" placeholder="District" className="input" value={userFormData.district} onChange={(e) =>
                  setUserFormData({ ...userFormData, district: e.target.value })
                } />
                <input name="state" type="text" placeholder="State" className="input" value={userFormData.state} onChange={(e) =>
                  setUserFormData({ ...userFormData, state: e.target.value })
                } />
                <input name="pincode" type="text" placeholder="Pincode" className="input" value={userFormData.pincode} onChange={(e) =>
                  setUserFormData({ ...userFormData, pincode: e.target.value })
                } />
                <input name="landmark" type="text" placeholder="Landmark" className="input" value={userFormData.landmark} onChange={(e) =>
                  setUserFormData({ ...userFormData, landmark: e.target.value })
                } />
              </div>
            </div>

            {/* 🔹 Qualification */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Qualification
              </h2>

              <select name="qualification" className="input w-full" value={userFormData.qualification}
                onChange={(e) =>
                  setUserFormData({ ...userFormData, qualification: e.target.value })
                }>
                <option value="">Highest Qualification</option>
                <option value="Illiterate">Illiterate</option>
                <option value="Primary Education">Primary</option>
                <option value="Middle Education">Middle</option>
                <option value="High School Education">Secondary</option>
                <option value="Higher Secondary Education">Higher Secondary</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="PHD">PHD</option>
              </select>
            </div>

            {/* 🔹 Occupation */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Occupation
              </h2>

              <select name="occupation_status" className="input w-full" value={userFormData.occupation_status}
                onChange={(e) =>
                  setUserFormData({ ...userFormData, occupation_status: e.target.value })
                }>
                <option value="">Select</option>
                <option value="Student">Student</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Private Employee">Private Employee</option>
                <option value="Government Employee">Government Employee</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* 🔹 Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>

        </div>

      </div>
    </>
  )
}


export default EditProfile;
