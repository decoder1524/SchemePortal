import React from 'react'

const ContactUs = () => {
  return (
    <>
      <div className='m-auto mt-5 container border border-blue-600 rounded-2xl p-4 shadow-2xl sm:w-fit max-sm:w-96'>
          <h1 className='font-bold text-4xl text-blue-500 max-sm:text-2xl'>Contact Us</h1>
          <div className='p-4 mt-7'>
            <form action="/contactUs" method="post">
            <input type="text" name="probmlemTitle" id="title " className='block w-full p-3' placeholder='Problem Title' />
            <textarea name="description" id="description" className=' mt-3 p-3 w-full' placeholder='Describe your problem'/>
            <input type="file" name="screenshot" className='mt-3 text-blue-800' id="screenshot" accept='image/*' multiple onChange={(e)=>console.log(e.target.files)
            } />
            <label htmlFor="screenshot" className='mt-4 cursor-pointer'> Upload File</label>
            <button type="submit" className='p-2 bg-blue-500 hover:text-white block rounded mt-8 m-auto'>Submit</button>
            </form>
          </div>
      </div>

    </>
  )
}

export default ContactUs
