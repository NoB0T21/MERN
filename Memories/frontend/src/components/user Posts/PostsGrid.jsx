import Post from './posts'
import { useState,useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataProvider';
import { api } from '../../utils/api';
import PostSkeleton from '../PostSkeleton';


const PostsGrid = () => {
    const {userData,postData} = useContext(DataContext);
    const [posts,setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    if(!userData.email){}

    useEffect(()=>{
      setLoading(true)
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
        setLoading(false)
      }
      fun()
    },[postData])

    if (loading) return <PostSkeleton/>;

  return (
    <><div className='flex flex-wrap justify-center md:justify-start gap-5 w-full'>{posts.slice().reverse().map((e) => {return <Post key={e._id} data={e} />})}</div></>
  )
}

export default PostsGrid
