import { useState,useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataProvider';
import { api } from '../../utils/api';
import Post from '../Posts/post'

const UserPosts = () => {
    const {userData} = useContext(DataContext);
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
    <>
      <div className='flex justify-center md:justify-start items-start gap-8 mt-3 md:mx-20 2xl:mx-55 xl:mx-25 rounded-lg h-[95vh] md:h-[90vh]'>
        <div className="w-full h-[83%] justify-center items-start rounded-lg flex flex-wrap gap-8 overflow-auto">
          <div className='bg-red-600 w-full h-40 md:h-50'>profile</div>
          <div className='bg-yellow-600 w-full h-20 sticky top-0 z-1'>profile</div>
          {posts.slice().reverse().map((e) => {return <Post key={e._id} data={e} />})}
        </div>
      </div>
    </>
  )
}

export default UserPosts
