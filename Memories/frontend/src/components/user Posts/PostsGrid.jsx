import Post from './posts'
import { useState,useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataProvider';
import { api } from '../../utils/api';


const PostsGrid = () => {
    const {userData,postData} = useContext(DataContext);
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
    <><div className='flex gap-8 flex-wrap w-full'>{posts.slice().reverse().map((e) => {return <Post key={e._id} data={e} />})}</div></>
  )
}

export default PostsGrid
