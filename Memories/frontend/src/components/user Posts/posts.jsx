import { useContext, useState } from 'react';
import {api} from '../../utils/api.js';
import { DataContext } from '../../context/DataProvider';
import {Link} from 'react-router-dom';
import { Delete, Like, LikeFill, Menu, Close, EditIcon } from '../Icons/Icons.jsx';
import useData from '../../utils/api';
import SigninAlert from '../SigninAlert.jsx';

const posts = (props) => {
    const {setPostData,userData} = useContext(DataContext);
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(false);
    const [showPost, setShowPost] = useState(false)
  
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
      setProgress(76)
      const {getData}=useData(setPostData);
      getData();
      setProgress(100)
    };
  
    const likePost = async () => {
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
      const {getData}=useData(setPostData);
      getData();
    }
    return (
      <>
        <div className="top-0 absolute w-full max-w-xl">
          <div className="bg-transparent rounded-full h-[4px] overflow-hidden">
            <div
              className="bg-indigo-700 h-full transition-all duration-200 ease-linear"
              style={{ width: `${progress}%` }}
              />
          </div>
        </div>
        <div className='relative flex flex-col justify-start bg-zinc-700 rounded-md w-85 md:w-51 md:max-w-80 h-auto overflow-clip'>
          <img className='static bg-black opacity-70 rounded-md h-40 object-cover' src={props.data.ImageUrl} />
          <div className='top-2 left-5 absolute flex justify-between text-white w-full pr-2'>
            <div className='flex flex-col justify-center items-start'>
                <div className='font-bold text-gray-200'>{props.data.creator}</div>
                <div>{props.data.createdAt}</div>
            </div>
            <div className='text-white w-10 h-10 m-1' onClick={()=>setShowPost(!showPost)}>
                <Menu/>
            </div>
          </div>
            <div className={`${showPost?'bottom-0':'-bottom-40'} p-4 rounded-md bg-zinc-800 absolute flex flex-col gap-2 justify-start w-full h-1/2 transition-(bottom) duration-200 ease-in-out`}>
                <Link to={'/edit/'+props.data._id} className='w-full h-8 hover:bg-zinc-700 rounded-md flex justify-between items-center px-2'><EditIcon/>Edit
                </Link>
                <div className='border-b-2 border-zinc-600'></div>
                <button onClick={() => {deletePost(props.data._id)}} className='w-full rounded-md h-8 hover:bg-zinc-700 flex justify-between items-center px-2 text-red-500'>
                    <Delete/> Delete
                </button>
            </div>
          <div className='static flex justify-between mx-5 mt-1 px-2 py-2'>{props.data.tags}</div>
          <h1 className='static flex justify-between mx-5 px-2 py-2 font-semibold text-2xl'>{props.data.title}</h1>
          <div className='flex mx-5 px-2 font-medium text-xl'>{props.data.message}</div>
          <div className='static flex justify-between px-2 py-3'>
            <button onClick={() =>likePost()} className="flex items-center gap-1">
              {props.data.likecount?.includes(userData.id||userData._id) ? < LikeFill/> : < Like/>}
              <span>{props.data.likecount?.length}</span>
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
