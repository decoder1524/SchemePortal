import React from 'react'
import { Link } from 'react-router-dom'

const Herosection = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <div className='m-auto mt-20 container border border-white rounded-2xl p-4 shadow-2xl sm:w-fit'>
            {user?.isLoggedIn && <> 
            <h1 className='font-bold text-5xl text-blue-500 max-sm:text-3xl '>Hi, {user?.user?.role}</h1> 
            
            </>}
            {user.user.role === 'admin' ? <> <h2 className='font-bold text-5xl text-blue-300 max-sm:text-3xl ' >Manage Government Schemes</h2> <p className='font-bold text-3xl m-2 mb-3 text-gray-400'> You Are Assigned For </p> </> :<> <h2 className='font-bold text-5xl text-blue-300 max-sm:text-3xl ' >Discover Government Schemes</h2><p className='font-bold text-3xl m-2 mb-3 text-gray-400'> You Are Eligible For </p> </>  }
            
            
            
            {user?.isLoggedIn ? (user?.user?.role === 'admin' || user?.user?.role === 'officer') ? <Link to={'/adminDashboard'} className='bg-blue-500 p-2 rounded-lg '>Manage Schemes</Link> :<Link to={'/get-myscheme'} className='bg-blue-500 p-2 rounded-lg '>Check Eligibility</Link>  : <Link to={'/signup'} className='bg-blue-500 p-2 rounded-lg'>Check Eligibility</Link>}


            <p className='text-gray-500  mt-3 sm:w-96 '> This is Scheme Eligibility Portal that helps citizens to avail schemes provided by the State and Central Government. It is One-time registration portal that user register at once and their based on eligibility we will notfiy if any schemes are advertised. </p>
        </div>

    )
}

export default Herosection
