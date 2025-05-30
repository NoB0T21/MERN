import { useContext, useState } from 'react';
import {api} from '../../utils/api.js';
import useData from '../../utils/api';
import { DataContext } from '../../context/DataProvider';
import {Link} from 'react-router-dom';
import { Delete, Like, LikeFill, Menu } from '../Icons/Icons.jsx';


const post = (props) => {
  const {setPostData} = useContext(DataContext);
  const [progress, setProgress] = useState(0);
  
  const deletePost = async (id) => {
    setProgress(10)
    setProgress(54)
    const token = localStorage.getItem('token');
    const data = await api.post(`${import.meta.env.VITE_BASE_URL}/delete/${id}`,
      {},
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
        <Link to={'/edit/'+props.data._id}>
          <Menu/>
        </Link>
      </div>
      <div className='static flex justify-between mx-5 mt-1 px-2 py-2'>{props.data.tags}</div>
      <h1 className='static flex justify-between mx-5 px-2 py-2 font-semibold text-2xl'>{props.data.title}</h1>
      <div className='flex mx-5 px-2 font-medium text-xl'>{props.data.message}</div>
      <div className='static flex justify-between px-2 py-3'>
        <button>
          <Like/>
          <LikeFill/>
        </button>
        <button onClick={() => {deletePost(props.data._id)}} className='text-red-500'>
          <Delete/>
        </button>
      </div>
    </div>
    </>
  )
};

export default post;
