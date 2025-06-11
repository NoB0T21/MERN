import { useEffect, useState } from "react"
import {api} from '../../utils/api'
import NavHeader from '../NavHeader'
 
const ViewPost = () => {
    const [posts, setPosts ] = useState([])
    useEffect(()=>{
        const func = async () => {
            const token = localStorage.getItem("token")
            const path = window.location.pathname; // Example: /profile/123
            const parts = path.split("/"); // Split by "/"
            const post = await api.get(`/postByid/${parts[2]}`,// Assuming id is at index 2
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })
            console.log(post.data[0])
            setPosts(post.data[0])
        }
        func()
    },[])
  return (
    <>
        <NavHeader/>
        <div className="flex flex-col justify-center items-center mx-10 md:mx-20 2xl:mx-55 xl:mx-25 mt-[15px] h-full overflow-y-auto">
            <img className='static bg-black rounded-xl h-full object-cover' src={posts.ImageUrl} />
        </div>
    </>
  )
}

export default ViewPost
