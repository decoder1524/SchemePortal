import React from 'react'
import { feedBack } from '../../../api/userApi';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const handleContactUs = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("userId",user?.user?.userId);
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

    </>
  )
}

export default ContactUs
