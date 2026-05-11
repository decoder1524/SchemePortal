import React, { useEffect, useState } from 'react'
import { getEligibleUsers, getNotifications, sendNewSchemeMail } from '../../../api/userApi'

const GetEligibleUsers = ({eligibleUsers}) => {
    const [loading,setLoading] = useState(false);
    const [send, setSend] = useState([]); 
    const handleNotify = async () => {
        try {
            setLoading(true)
            const Notify = await sendNewSchemeMail(eligibleUsers);
            console.log(Notify?.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setSend(Notify.data.success)
            setLoading(false)

        }
    }

    useEffect(()=>{
        (async ()=>{
        try {
            const res = await getNotifications();
            console.log(res?.data?.notification)
            setSend(res?.data?.notification)
        } catch (error) {
            console.log(error);
            
        }
    })()
    },[])
    return (
        <>
            <div className='border p-4 border-white shadow-2xl '>
                <button className='p-2 bg-blue-500 rounded flex ml-auto disabled:bg-blue-300 ' disabled={loading} onClick={handleNotify}>NotifyAll</button>
                <table className='border w-full '>
                    <thead className='border'>
                        <tr className='border'>
                            <th className='border p-1 bg-black text-white'>UserId</th>
                            <th className='border p-1 bg-black text-white'>Email</th>
                            <th className='border p-1 bg-black text-white'>Role</th>
                            <th className='border p-1 bg-black text-white'>Eligible Scheme</th>
                            <th className='border p-1 bg-black text-white'>Notified</th>
                        </tr>
                    </thead>
                    {eligibleUsers?.map((eligible,index) => {
                        return <tbody className='border' key={eligible.userId}>
                            <tr className='border'>
                                <td className='border p-1 hover:bg-gray-400'>{eligible?.userId}</td>
                                <td className='border p-1 hover:bg-gray-400'>{eligible?.email}</td>
                                <td className='border p-1 hover:bg-gray-400'>{eligible?.role}</td>
                                <td className='border p-1 hover:bg-gray-400'>
                                    {eligible?.eligible_scheme?.map(scheme => 
                                    <p key={scheme.schemeid}>{scheme.schemeName}</p>)}
                                </td>
                                <td className='border p-1 hover:bg-gray-400 '>
                                  {loading ? <p className='p-1'>{'Sending...'}</p>:
                                    <p className='text-green-600'>
                                        {send[index]?.notified ? "sent"  : <span className='text-red-700'> Not Sent</span>}
                                    </p>}
                                </td>
                            </tr>
                        </tbody>
                    })}
                </table>
            </div>
        </>
    )
}

export default GetEligibleUsers
