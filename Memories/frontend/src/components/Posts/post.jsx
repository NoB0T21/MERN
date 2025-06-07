import { useContext, useState } from 'react';
import {api} from '../../utils/api.js';
import { DataContext } from '../../context/DataProvider';
import { Like, LikeFill, Close } from '../Icons/Icons.jsx';
import useData from '../../utils/api';
import SigninAlert from '../SigninAlert.jsx';

const post = (props) => {
  const {setPostData,userData,setUserData} = useContext(DataContext);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  const likePost = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      setShow(true)
      return
    }
    const data = await api.get(`/like/${props.data._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    const {getData}=useData(setPostData,props?.limit);
    getData();
  }

  const follow = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      setShow(true)
      return
    }
    const data = await api.get(`/user/follow/${props.data.owner}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    const user = await api.get(`/user/user/${userData._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    setUserData(user.data)
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
      <div className='relative flex flex-col justify-start bg-zinc-700 rounded-md w-85 md:w-80 max-w-90 h-auto overflow-clip'>
        <img className='static bg-black opacity-70 rounded-md h-65 object-cover' src={props.data.ImageUrl} />
        <div className='top-2 left-5 absolute flex flex-col justify-center items-start text-white'>
          <div className='font-bold text-gray-200'>{props.data.creator}</div>
          <div>{props.data.createdAt}</div>
        </div>
        <div className='top-2 right-1 absolute text-white'>
          <div className='px-2 py-1'>
            {userData._id===props.data.owner ? 
            'hello' : <>
              <div onClick={() =>follow()} className="flex items-center gap-1 px-2 border-1 rounded-md cursor-pointer">
                {userData.following?.includes(props.data?.owner) ? 'following' : 'follow'}
              </div>
            </>}
          </div>
        </div>
        <div className='static flex justify-between mx-5 mt-1 px-2 py-2'>{props.data.tags}</div>
        <h1 className='static flex justify-between mx-5 px-2 py-2 font-semibold text-2xl'>{props.data.title}</h1>
        <div className='flex mx-5 px-2 font-medium text-xl'>{props.data.message}</div>
        <div className='static flex justify-between px-2 py-3'>
          <button onClick={() =>likePost()} className="flex items-center gap-1">
            {props.data.likecount?.includes(userData?._id) ? < LikeFill/> : < Like/>}
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
};

export default post;
