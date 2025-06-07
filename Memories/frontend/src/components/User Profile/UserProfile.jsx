import { useContext, useEffect, useState } from "react"
import {DataContext} from '../../context/DataProvider'
import { api } from "../../utils/api"

const UserProfile = () => {
    const {userData,postData} = useContext(DataContext)
    const [posts,setPosts] = useState([])
    if(!userData.email){}

    useEffect(()=>{
      const fun = async () => {
        const token = localStorage.getItem('token');
        const data = await api.get(`/profile/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        setPosts(data.data)
      }
      fun()
    },[location.pathname,postData])

  return (
    <div className=" w-full h-full">
        <div className="h-full flex justify-between items-center gap-5 px-3">
            <img className="w-20 h-20 md:w-40 md:h-40 rounded-full" src={userData.picture} />
            <div className="text-md md:text-2xl flex items-start flex-col">
                <h3 className="font-bold">{posts.length}</h3>
                <p className=" font-semibold">posts</p>
            </div>
            <div className="text-md md:text-2xl flex items-start flex-col">
                <h3 className="font-bold">{userData.followers.length}</h3>
                <p className=" font-semibold">followers</p>
            </div>
            <div className="text-md md:text-2xl flex items-start flex-col">
                <h3 className="font-bold">{userData.following.length}</h3>
                <p className=" font-semibold">following</p>
            </div>
        </div>
    </div>
  )
}

export default UserProfile
