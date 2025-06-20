import { useEffect, useState,useContext } from "react"
import {api} from '../../utils/api.js';
import { DataContext } from '../../context/DataProvider';
import { Like, LikeFill} from '../Icons/Icons';
import NavHeader from '../NavHeader'
import useData from '../../utils/api';
 
const ViewPost = () => {
    const {setPostData,userData} = useContext(DataContext);
    const [posts, setPosts ] = useState([])
    const [like, setLike ] = useState([])
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
            setPosts(post.data[0])
            setLike(post.data[0].likecount)
        }
        func()
    },[])
    const likePost = async () => {
        const token = localStorage.getItem('token');
        if(!token){
          setShow(true)
          return
        }
        const data = await api.get(`${import.meta.env.VITE_BASE_URL}/like/${posts._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const {getData}=useData(setPostData);
        getData();
        if(data.status===200){
            const userId = userData?._id || userData?.id;
            const currentLikes = Array.isArray(like) ? like : [];

            const index = currentLikes.indexOf(userId);
            let updatedLikes;

            if (index === -1) {
            updatedLikes = [...currentLikes, userId]; // Add like
            } else {
            updatedLikes = currentLikes.filter(id => id !== userId); // Remove like
            }
            setLike(updatedLikes);
        }
      }
  return (
    <>
        <NavHeader/>
        <div className="flex justify-center items-center mx-10 md:mx-20 2xl:mx-55 xl:mx-25 mt-[15px] h-full">
            <div className="flex flex-col justify-start items-center gap-5 bg-zinc-800 p-5 pb-10 rounded-md w-[100%] h-[90vh] overflow-auto">
                <img className='rounded-xl w-full h-full object-cover' src={posts.ImageUrl} />
                <div className="flex justify-start items-center gap-2 w-full">
                    <div className="flex flex-col items-start">
                        <div className='flex flex-wrap justify-start w-full'>{posts.tags?.map((tag, index) => (
                            <span key={index} className="flex items-center mr-2 rounded-md font-semibold text-blue-500 hover:text-blue-600 text-sm hover:underline hover:underline-offset-1 cursor-pointer">
                            {tag}
                            </span>
                        ))}</div>
                        <div className="flex justify-start items-center gap-10 w-full">
                            <p className="text-sm">
                                <span className="mr-4 font-semibold text-md">{new Date(posts.createdAt).toLocaleString()}
                                </span>{posts.createdAt}
                            </p>
                            <div className="flex">
                                <div className="flex justify-center items-center bg-zinc-700 p-2 rounded-full h-10">
                                    <button onClick={() =>likePost()} className="flex items-center gap-1">
                                    {like?.includes(userData.id||userData._id) ? < LikeFill/> : < Like/>}
                                    <span>{like?.length}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex justify-start w-full">
                    <h1 className="font-bold text-3xl">{posts.title}</h1>
                </div>
                <div className="flex justify-start w-full">
                    <h1 className="font-semibold text-xl text-left whitespace-pre-wrap">{posts.message}</h1>
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewPost
