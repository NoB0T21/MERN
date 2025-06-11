import { useContext, useEffect, useState } from 'react'
import {DataContext} from '../../context/DataProvider'
import { api } from '../../utils/api'

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
                console.log(data.data)
                setFollower(data.data)
            }
            followe()
    },[])
  return (
    <div>
      foloe
    </div>
  )
}

export default Follower
