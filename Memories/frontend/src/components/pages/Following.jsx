import { useContext, useEffect, useState } from 'react'
import {DataContext} from '../../context/DataProvider'
import { api } from '../../utils/api'

const Following = () => {
  const [follower, setFollower] = useState([])
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

  const {userData} = useContext(DataContext)
  return (
    <div>
      yooooooo
    </div>
  )
}

export default Following
