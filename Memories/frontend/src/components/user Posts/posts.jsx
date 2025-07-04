import { useContext, useEffect, useState } from 'react';
import {api} from '../../utils/api.js';
import { DataContext } from '../../context/DataProvider';
import {Link, useNavigate} from 'react-router-dom';
import { Delete, Like, LikeFill, Menu, Close, EditIcon, Download } from '../Icons/Icons.jsx';
import SigninAlert from '../SigninAlert.jsx';
import useData from '../../utils/api';

const posts = (props) => {
  const navigate = useNavigate();
    const {setPostData,userData} = useContext(DataContext);
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(false);
    const [showPost, setShowPost] = useState(false)
    const [like, setLike ] = useState([])
    useEffect(()=> {
    setLike(props.data.likecount)
  },[])
    const deletePost = async (id) => {
      setProgress(10)
      setProgress(54)
      const token = localStorage.getItem('token');
      const data = await api.post(`${import.meta.env.VITE_BASE_URL}/delete/${id}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setTimeout(() => {
        setProgress(76)
      },2000);
      const {getData}=useData(setPostData,props?.limit-1);
      getData();
      getData();
      setProgress(100)
    };
  
    const likePost = async (id) => {
      const token = localStorage.getItem('token');
      if(!token){
        setShow(true)
        return
      }
      const data = await api.get(`${import.meta.env.VITE_BASE_URL}/like/${props.data._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if(data.status === 200) {
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

    const downloadPost = async (id) => {
  setProgress(10);
  setProgress(54);
  const token = localStorage.getItem('token');

  try {
    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/download/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'blob', // Ensure we get a blob for file download
    });

    // Extract filename from Content-Disposition header
    let fileName = 'downloaded-file';
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) fileName = match[1];
    }

    // Create a download link and click it
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setProgress(76);
    setProgress(100);
    window.URL.revokeObjectURL(url);
    setProgress(0);
  } catch (err) {
    console.error("Download failed:", err);
    setProgress(0);
  }
};

    return (
      <>
        <div className="top-0 absolute w-full">
          <div className="bg-transparent rounded-full h-[4px] overflow-hidden">
            <div
              className="bg-indigo-700 h-full transition-all duration-200 ease-linear"
              style={{ width: `${progress}%` }}
              />
          </div>
        </div>
        <div className='relative flex flex-col justify-start bg-[rgba(84,84,84,0.6)] md:bg-[rgba(84,84,84,0.6)] backdrop-blur-5xl rounded-md w-72 md:w-80 max-w-90 h-auto overflow-clip'>
          <div className='flex flex-col'>
              <img onClick={()=>{navigate(`${'/post/'+props.data._id}`, { replace: true });}} className='static bg-black opacity-70 rounded-md h-40 object-cover' src={props.data.ImageUrl} />
            <div className='top-2 left-5 absolute flex justify-between pr-2 w-full text-white'>
              <div className='flex flex-col justify-center items-start'>
                  <div className='font-bold text-gray-200'>{props.data.creator}</div>
                  <div>{props.data.createdAt}</div>
              </div>
              <div className='m-1 w-10 h-10 text-white' onClick={()=>setShowPost(!showPost)}>
                  <Menu/>
              </div>
            </div>
              <div className={`${showPost?'bottom-0':'-bottom-100'} p-4 rounded-md bg-zinc-800 absolute flex flex-col gap-2 justify-start w-full h-1/2 transition-(bottom) duration-200 ease-in-out`}>
                  <Link to={'/edit/'+props.data._id} className='flex justify-between items-center hover:bg-zinc-700 px-2 rounded-md w-full h-8'><EditIcon/>Edit
                  </Link>
                  <div className='border-zinc-600 border-b-2'></div>
                  <button onClick={() => {downloadPost(props.data._id)}} className='flex justify-between items-center hover:bg-zinc-700 px-2 rounded-md w-full h-8 text-white'>
                      <Download/> Download
                  </button>
                  <div className='border-zinc-600 border-b-2'></div>
                  <button onClick={() => {deletePost(props.data._id)}} className='flex justify-between items-center hover:bg-zinc-700 px-2 rounded-md w-full h-8 text-red-500'>
                      <Delete/> Delete
                  </button>
              </div>
            <div className='flex flex-col flex-start gap-2'>
              <div className='flex justify-start mx-1mt-1 p-1'>{props.data.tags.map((tag, index) => (
                    <span key={index} className="flex items-center mx-1 rounded-md text-blue-500 hover:text-blue-600 text-sm hover:underline hover:underline-offset-1 cursor-pointer">
                      {tag}
                    </span>
                  ))}</div>
              <h1 className='static flex justify-between mx-5 px-2 py-2 font-semibold text-2xl text-start truncate'>{props.data.title}</h1>
              <div className='mx-5 h-15 font-medium text-sm text-start truncate'>{props.data.message}</div>
            </div>
          </div>
          <div className='static flex justify-between px-2 py-3'>
            <button onClick={() =>likePost()} className="flex items-center gap-1">
              {like?.includes(userData.id||userData._id) ? < LikeFill/> : < Like/>}
              <span>{like?.length}</span>
            </button>
          </div>
        </div>
        <div className={`${show ? 'flex' : 'hidden'} top-0 right-0 z-3 absolute justify-center items-center backdrop-blur-sm bg-[#0000005d] w-full h-full scroll-none `}>
          <div className='flex flex-col justify-start items-center gap-6 bg-zinc-800 px-2 pt-5 pb-10 rounded-md w-1/2 md:w-1/3 max-w-[550px] h-1/2 max-h-[700px]'>
            <div className='flex justify-end w-full'>
              <button onClick={() => {setShow(false)}}>
                <Close/>
              </button>
            </div>    
            <SigninAlert/>
          </div>
        </div>
      </>
    )
}

export default posts
