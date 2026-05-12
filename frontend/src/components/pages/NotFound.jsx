import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className='mt-20 flex flex-col  justify-center items-center '>
      <h1 className='text-6xl font-bold text-blue-500'>404</h1>
      <p className='text-2xl mt-4 text-gray-500'>Page Not Found</p>
        <Link to="/" className='mt-6 border px-4 py-2 rounded hover:bg-blue-500 hover:text-white hover:border-white'>Go Home</Link>
    </div>

    </>
  )
}

export default NotFound
