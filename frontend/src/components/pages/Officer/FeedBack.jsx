import React, { useEffect, useState } from 'react'
import { getFeed } from '../../../api/userApi'

const FeedBack = () => {
    const [feedback, setFeedback] = useState([])
    const user = localStorage.getItem("user")
    useEffect(() => {
        (async () => {
            try {
                const res = await getFeed();
                console.log(res);
                setFeedback(res?.data?.data)
            } catch (error) {
                console.log(error);

            }
        })()
    }, [user])
    return (
        <div className='h-full w-full'>
            <table className='container  justify-center m-auto mt-10'>
                <thead>
                    <tr className='border'>
                        <th className='border bg-black text-white'>UserId</th>
                        <th className='border bg-black text-white'>Scheme Title</th>
                        <th className='border bg-black text-white'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {feedback?.map(feed => {
                        return <>
                            <tr>
                                <td className='border'>{feed.userid}</td>
                                <td className='border'>{feed.title}</td>
                                <td className='border'>{feed.description}</td>
                            </tr>
                        </>
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default FeedBack
