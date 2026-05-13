import React, { useEffect, useState } from 'react'
import { getFeed, updateFeedback } from '../../../api/userApi'

const FeedBack = () => {
    const [feedback, setFeedback] = useState([])
    const [status,setStatus] = useState("")
    const user = localStorage.getItem("user")
    const fetchFeedbacks = async ()=>{
        try {
                const res = await getFeed();
                console.log(res);
                setFeedback(res?.data?.data)
            } catch (error) {
                console.log(error);

            }
    }
    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleAccept = async(e,id)=>{
        const formData = new FormData(e.target)
        formData.append("id",id)
        formData.append("status","Accepted")
        formData.append("rejectReason","Accepted")

        const data = Object.fromEntries(formData)
        console.log(data);
        try {
            const updateData = await updateFeedback(data)
            console.log(updateData.data); 
            fetchFeedbacks()  
        } catch (error) {
            console.log(error);
            
        }
        

    }
    const handleReject = async(e,id)=>{
        const formData = new FormData(e.target)
        formData.append("id",id)
        formData.append("status","Rejected")
        const data = Object.fromEntries(formData)
        console.log(data);
        try {
            const updateData = await updateFeedback(data)
            console.log(updateData.data);
            fetchFeedbacks();
        } catch (error) {
            console.log(error); 
        }
        


    }
    const handleClick = (id) =>{

    }

    return (
        <div className='h-full w-full'>
            {feedback?.length > 0 ?<table className='container  justify-center m-auto mt-10'>
                <thead>
                    <tr className='border'>
                        <th className='border bg-black text-white p-2'>Feedback Id</th>
                        <th className='border bg-black text-white p-2'>UserId</th>
                        <th className='border bg-black text-white p-2'>Scheme Title</th>
                        <th className='border bg-black text-white p-2'>Description</th>
                        <th className='border bg-black text-white p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {feedback?.map(feed => {
                        return <>
                            <tr key={feed.userid}>
                                <td className='border p-2'>{feed.id}</td>
                                <td className='border p-2'>{feed.userid}</td>
                                <td className='border p-2'>{feed.title}</td>
                                <td className='border p-2'>{feed.description}</td>
                                    <td className='border p-2 flex gap-5 justify-center'>
                                {feed.status === 'Form Submitted' ? <>
                                    <form onSubmit={(e)=>{
                                        e.preventDefault()
                                        handleAccept(e,feed.id)}}>
                                    <button type='submit' className='p-2 bg-green-600 rounded cursor-pointer hover:bg-green-500 hover:text-white border hover:border-green-500' onClick={() =>{handleClick(feed.id)}}>
                                        Accept
                                    </button>
                                        
                                    </form>
                                    <form onSubmit={(e)=>{
                                        e.preventDefault();
                                        handleReject(e,feed.id)}}>
                                        <input type="text" name="rejectReason" placeholder='Reason' className='p-2 border mx-2 rounded border-red-500' required />
                                    <button type='submit' className='p-2 bg-red-600 rounded cursor-pointer hover:bg-red-500 hover:text-white border hover:border-red-500'>
                                        Reject
                                    </button>
                                    </form>
                                    </> : feed.status === 'Accepted' ? (<span className='text-green-600 font-semibold'> Accepted</span>) : (<span className='text-red-600'>Rejected : {feed.reject_reason}</span>)}
                                </td>
                                
                            </tr>
                        </>
                    })}

                </tbody>
            </table> : <div className='border items-center flex justify-center w-fit p-2 border-white shadow-2xl m-auto mt-10 rounded-lg'><h1 className='text-4xl p-2 font-bold text-green-600 '>No Feedbacks</h1></div> }
            
        </div>
    )
}

export default FeedBack
