import { useContext, useEffect, useState } from "react"
import {DataContext} from '../../context/DataProvider'
import { api } from "../../utils/api"
import { Link } from "react-router-dom"

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
    },[location.pathname])

  return (
    <div className="bg-[rgba(84,84,84,0.4)] backdrop-blur-5xl rounded-2xl w-full h-full">
        <div className="flex justify-between xl:justify-start items-center gap-5 xl:gap-20 px-3 w-full h-full">
            <img className="rounded-full w-18 md:w-25 h-18 md:h-25" src={userData.picture} />
            <div to={'/user/profile'} className="flex flex-col items-start text-md md:text-xl">
                <h3 className="font-bold">{posts.length}</h3>
                <p className="font-semibold">posts</p>
            </div>
            <Link to={'/user/followers'} className="flex flex-col items-start text-md md:text-xl">
                <h3 className="font-bold">{userData.followers.length}</h3>
                <p className="font-semibold">followers</p>
            </Link>
            <Link to={'/user/following'} className="flex flex-col items-start text-md md:text-xl">
                <h3 className="font-bold">{userData.following.length}</h3>
                <p className="font-semibold">following</p>
            </Link>
        </div>
    </div>
  )
}

export default UserProfile
