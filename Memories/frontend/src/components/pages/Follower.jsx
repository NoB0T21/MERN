import { useContext, useEffect, useState } from 'react'
import {DataContext} from '../../context/DataProvider'
import { api } from '../../utils/api'
import UserProfile from '../UserProfile'

const Follower = () => {
    const {userData} = useContext(DataContext)
    const [follower, setFollower] = useState([])
    useEffect(()=>{
        const followe = async () => {
            const token = localStorage.getItem('token');
            const data = await api.post('/user/follower', userData.followers,
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                })
                setFollower(data.data)
            }
            followe()
    },[])
  return (
    <div className='flex justify-center w-full h-[100vh]'>
      <div className='flex flex-col justify-start items-center gap-8 bg-linear-to-tl from-[rgba(165,54,225,0.4)] to-[rgba(88,40,185,0.4)] shadow-xl backdrop-blur-5xl mx-10 my-5 p-5 rounded-md w-full md:w-1/2 lg:w-200 h-[90%] overflow-y-scroll'>
        {follower.map((profile)=>(<UserProfile key={profile._id} data={profile}/>))}
      </div>
    </div>
  )
}

export default Follower
