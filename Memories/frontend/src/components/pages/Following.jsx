import { useContext, useEffect, useState } from 'react'
import {DataContext} from '../../context/DataProvider'
import { api } from '../../utils/api'
import UserProfile from '../UserProfile'

const Following = () => {
  const [follower, setFollower] = useState([])
  const {userData} = useContext(DataContext)
  useEffect(()=>{
        const token = localStorage.getItem('token');
        const followi = async () => {
            const data = await api.post('/user/following', userData.following,
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                })
                setFollower(data.data)
        }
        followi()
  },[])

  return (
    <div className='flex justify-center w-full h-[100vh]'>
      <div className='my-5 mx-10 p-5 flex flex-col gap-20 justify-start items-center bg-zinc-800 rounded-md w-full h-[90%] md:w-1/2 lg:w-200 overflow-y-scroll'>
        {follower.map((profile)=>(<UserProfile key={profile._id} data={profile}/>))}
      </div>
    </div>
  )
}

export default Following
