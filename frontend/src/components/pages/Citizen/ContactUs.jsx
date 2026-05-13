import React, { useEffect, useState } from 'react'
import { feedBack, getFeedbacks } from '../../../api/userApi';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [feedbackData,setFeedbackData] = useState([])
  const handleContactUs = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("userId",user?.user?.userId);
    formData.append("status","Form Submitted");
    formData.append("rejectReason","Not Found");
    const data = Object.fromEntries(formData)
    console.log(data);
    try {
      const res = await feedBack(data);
      console.log(res.data);
      toast.success(res?.data?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message)
      
    }
    
  }

  useEffect(()=>{
    (async()=>{
      try {
        const feedbacks = await getFeedbacks(user?.user?.userId)
        console.log(feedbacks.data);
        setFeedbackData(feedbacks?.data?.feedbacks)
        
      } catch (error) {
          console.log(error);
          
      }
    })()
  },[user])
  return (
    <>
      <div className='m-auto mt-5 container border border-blue-600 rounded-2xl p-4 shadow-2xl sm:w-fit max-sm:w-96'>
          <h1 className='font-bold text-4xl text-blue-500 max-sm:text-2xl'>Contact Us</h1>
          <p className='font-sans text-sm'>If you are aware of any additional schemes, kindly inform us so we can include them.</p>
          <p className='font-sans text-sm'>यदि आपको किसी अन्य योजना के बारे में जानकारी है, तो कृपया हमें सूचित करें ताकि हम उन्हें शामिल कर सकें।</p>
          <div className='p-4 mt-7'>
            <form onSubmit={handleContactUs} method='post'>
            <input type="text" name="title" id="title " className='block w-full p-3 border border-blue-300 rounded' placeholder='Scheme Title'/>
            <textarea name="description" id="description" className=' mt-3 p-3 w-full h-50 resize-none  border border-blue-300 rounded' placeholder='Scheme Description....'/>
            <button type="submit" className='p-2 bg-blue-500 hover:text-white block rounded mt-8 m-auto'>Submit</button>
            </form>
          </div>
      </div>

      <div className='container mt-10 m-5'>
        <h2 className='text-3xl '>Records</h2>
        <hr className='w-full'/>
        <div className='container border mt-2 rounded shadow-2xl border-white w-fit m-auto'>
          <table className='border w-30 text-center m-auto mt-10 rounded-xl overflow-hidden '>
            <thead className='bg-black text-white'>
              <tr>
                <th className='border-2 min-w-30 p-2 '>SNO</th>
                <th className='border-2 min-w-30 p-2 '>Email</th>
                <th className='border-2 min-w-30 p-2 '>Scheme Title</th>
                <th className='border-2 min-w-30 p-2 '>Description</th>
                <th className='border-2 min-w-30 p-2 '>Status</th>
                <th className='border-2 min-w-30 p-2 '>Reason</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData?.map(feedback => 
              <tr className='border-2 min-w-30 p-2 ' key={feedback.id}>
                <td className='border-2 min-w-30 p-2 '>{feedback.id}</td>
                <td className='border-2 min-w-30 p-2 '>{user?.user?.email}</td>
                <td className='border-2 min-w-30 p-2 '>{feedback.title}</td>
                <td className='border-2 min-w-30 p-2 '>{feedback.description}</td>
                <td className='border-2 min-w-30 p-2 '>{feedback.status}</td>
                <td className='border-2 min-w-30 p-2 '>{feedback.reject_reason}</td>
              </tr>)}
              
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default ContactUs
