import { useNavigate } from 'react-router-dom';
import { checkEligibleScheme, postEligibleData, registerProfile } from '../api/userApi';
import { toast } from 'react-toastify';
import { useState } from 'react';

const CreateProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [error, setError] = useState([]);
  const [file, setFile] = useState("");
  const [dob,setDob] = useState("");
  const [age,setAge] = useState("")
  const navigate = useNavigate();
  const handleAge = (date)=>{
    const birthYear = date?.split('-')[0]
    const currentYear = new Date().getFullYear()
    const finalAge = currentYear - Number(birthYear)
    // console.log(finalAge);
    setAge(finalAge)
    
  }
  const handleFile = (e) => {
    const file = e.target.files[0]
    console.log(e.target.files[0]);
    if (file) {
      setFile(URL.createObjectURL(file))
    }

  }
  const handleProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.delete("age")
    formData.append("age",Number(age));
    const userId = user.user.userId
    // console.log(user);
    // console.log(formData);
    try {
      const res = await registerProfile(userId, formData);
      // console.log(res);
      toast.success("Profile Registered Successfully")
      // console.log(user);
      navigate('/get-myscheme')
      try {
        const checkEligible = await checkEligibleScheme(userId)
        // console.log(checkEligible?.data);
        const allResult = checkEligible?.data?.allResult;
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
      console.error("Profile registration error:", error);
      // Try to extract validation error messages
      const messages = error?.response?.data?.message?.details;
      if (messages && Array.isArray(messages)) {
        setError(messages);
        messages.forEach(msg => {
          toast.error(msg?.message || "Validation error");
        });
      } else {
        const errorMsg = error?.response?.data?.message || "Failed to register profile";
        toast.error(errorMsg);
        setError([{ message: errorMsg }]);
      }
    }
  }
  return (
    <>
      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Complete Your Profile
        </h1>
        <p className="text-gray-600 mb-6">Enter your details below</p>
        {error && error.length > 0 && <div className='container border shadow-2xl p-4 rounded'>
          <h2>Errors: </h2>
          <ul >
            {error?.map((element) => {
              return <li key={element.message} className='text-red-700 font-semibold text-sm list-disc ml-10 ' >{element?.message}</li>
            })
            }

          </ul>
        </div>
        }
        <form action={'/register-profile'} method='POST' onSubmit={handleProfile} encType='multipart/form-data' className="space-y-8">

          {/* 🔹 Personal Details */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Personal Details
            </h2>
            <div className="flex space-x-3 " >
              <img src={
                file ? file :
                  "https://imgs.search.brave.com/3QDBvTILiulxQWmBi7gx3QB8j7NtOpGgAMold8LVAoc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE5/MjIyMjExMi92ZWN0/b3IvcHJvZmlsZS1h/dmF0YXItb2YtYmVh/cmQtbWFuLXdlYXJp/bmctc3VuZ2xhc3Nl/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9ODJldmhBR0hK/VHJhNmtqbFdORHdk/b21xR3VtVWpKb3Fx/dUdKbWJZQ0M1QT0"
              } className=' h-20 rounded-4xl m-auto mt-5  ' alt="Profile Photo" />
              <input type="file" name="profilePhoto" id="profilePhoto" accept='image/*' onChange={handleFile} hidden />
              <label htmlFor="profilePhoto" className='p-2 bg-blue-500 rounded-lg m-auto flex mt-5 justify-center hover:text-white '>Set Profile Photo</label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input name="firstName" type="text" placeholder="First Name" className="input" />
              <input name="lastName" type="text" placeholder="Last Name" className="input" />
              <input name="age" type="number" placeholder="Age " value ={age}className="input bg-gray-300" readOnly  />

              <select name="category" className="input">
                <option value="default">Select Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
              <input name="dob" type="date" placeholder="DOB" className="input" value={dob} 
              onKeyDown={(e)=>e.preventDefault()}
              onChange = {(e)=>{
                setDob(e.target.value)
                console.log(e.target.value);
                handleAge(e.target.value)

               }} />
              <input name="phone" type="number" placeholder="Phone" className="input" />
            </div>

            {/* Gender */}
            <div className="mt-4 flex items-center gap-4">
              <span className="font-medium">Gender:</span>
              <label className="flex items-center gap-1">
                <input type="radio" name="gender" value="Male" /> Male
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="gender" value="Female" /> Female
              </label>
            </div>
            {/* maritalStatus */}
            <div className="mt-4 flex items-center gap-4">
              <span className="font-medium">Marital Status:</span>
              <label className="flex items-center gap-1">
                <input type="radio" name="marital_status" value="Married" /> Married
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="marital_status" value="Unmarried" /> Unmarried
              </label>
            </div>
            {/* Minority */}
            <div className="mt-4 flex items-center gap-4">
              <span className="font-medium">Do you belongs to Minority :</span>
              <label className="flex items-center gap-1">
                <input type="radio" name="minority" value="yes" /> Yes
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="minority" value="no" /> No
              </label>
            </div>
          </div>
          {/* Income */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Income
            </h2>
            <select name="income" className="input">
              <option value="">Select Income</option>
              <option value="0-3L">0-3L</option>
              <option value="3L-5L">3L-5L</option>
              <option value="5L-10L">5L-10L</option>
              <option value="10L-20L">10L-20L</option>
            </select>
          </div>
          {/* 🔹 Address */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input name="street" type="text" placeholder="Street" className="input" />
              <input name="city" type="text" placeholder="City" className="input" />
              <input name="district" type="text" placeholder="District" className="input" />
              <input name="state" type="text" placeholder="State" className="input" />
              <input name="pincode" type="text" placeholder="Pincode" className="input" />
              <input name="landmark" type="text" placeholder="Landmark" className="input" />
            </div>
          </div>


          {/* 🔹 Qualification */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Qualification
            </h2>

            <select name="qualification" className="input w-full">
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

            <select name="occupation_status" className="input w-full">
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
            <button type="reset" className="px-5 py-2 bg-gray-300 rounded-lg">
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateProfile
