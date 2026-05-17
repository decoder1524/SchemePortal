import React, { useEffect, useState } from 'react'
import { getEligibleUsers, getNotifications, sendNewSchemeMail, sendNewSchemeMailSingle } from '../../../api/userApi'

const GetEligibleUsers = ({ eligibleUsers }) => {
    const [loading, setLoading] = useState([]);
    const [send, setSend] = useState([]);
    const handleNotify = async () => {
        try {
            setLoading(eligibleUsers.map(eligible => eligible.userId))
            const Notify = await sendNewSchemeMail(eligibleUsers);
            console.log(Notify?.data);
            setLoading(null)
        } catch (error) {
            console.log(error);
            setSend(Notify.data.success)
            setLoading(null)

        }
    }
    const handleNotifySingle = async (id) => {
        try {
            setLoading(id)
            const data = eligibleUsers.find(eligible => eligible.userId === id);
            const Notify = await sendNewSchemeMailSingle(data);
            console.log(Notify?.data);
            setLoading(null)
        } catch (error) {
            console.log(error);
            setSend(error?.response?.data.success)
            setLoading(null)

        }
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await getNotifications();
                console.log(res?.data?.notification)
                setSend(res?.data?.notification)
            } catch (error) {
                console.log(error);

            }
        })()
    }, [loading])
    return (
        <>
            <div className='border p-4 border-white shadow-2xl '>
                <button className='p-2 bg-blue-500 rounded flex ml-auto disabled:bg-blue-300 cursor-pointer' disabled={loading} onClick={handleNotify}>NotifyAll</button>
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
                    {eligibleUsers?.map((eligible, index) => {
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

                                    <p className='flex gap-5 justify-center hover:text-white'>
                                        {loading?.includes(eligible?.userId) ? "Sending" : <button className='p-2 bg-blue-500 rounded  disabled:bg-blue-300 cursor-pointer' disabled={loading?.includes(eligible?.userId)} onClick={() => { handleNotifySingle(eligible.userId) }}>
                                            {
                                                send.some(item => item.userid === eligible?.userId && item.notified) 
                                                    ? <span >Sent</span>
                                                    : <span>Notify</span>
                                            }</button>}

                                    </p>
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
