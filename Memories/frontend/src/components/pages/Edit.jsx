import { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {api} from '../../utils/api.js';
import useData from '../../utils/api.js';
import { ToastContainer, toast } from 'react-toastify';
import { DataContext } from '../../context/DataProvider';


const Edit = () => {
  const navigate = useNavigate();
  const {setPostData} = useContext(DataContext);
  const [post, setPost] = useState([]);
  const [creator, setCreator] = useState(`${post.creator}`);
  const [title, setTitle] = useState(`${post.title}`);
  const [message, setMessage] = useState(`${post.message}`);
  const [tags, setTags] = useState(`${post.tags}`);
  const [progress, setProgress] = useState(0);

  const error1 = (err) => toast.error(`${err}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const getIdFromUrl = () => {
    const path = window.location.pathname; // Example: /profile/123
    const parts = path.split("/"); // Split by "/"
    return parts[2]; // Assuming id is at index 2
  };
  const id = getIdFromUrl();

  const getpost = async () => {
    const token = localStorage.getItem('token');
    const {data} = await api.get(`${import.meta.env.VITE_BASE_URL}/edit/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    setPost(data);

    setCreator(`${data.creator}`);
    setTitle(`${data.title}`);
    setMessage(`${data.message}`);
    setTags(`${data.tags}`);
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    setProgress(10)
    const formData =
    {"creator": creator,
    "title": title,
    "message": message,
    "tags": tags};
  
    try {
      const token = localStorage.getItem('token');
      const response = api.patch(`${import.meta.env.VITE_BASE_URL}/update/${post._id}`,
        formData,
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setProgress(50)
      
      if(response === undefined){
        const err = 'server is closed'
        error1(err)
      }
      setProgress(70)
      const {getData}=useData(setPostData);
      await setTimeout(() => {
          getData();
          getData();
          setProgress(100);
          navigate('/', { replace: true });
        },1000);
        return () => clearTimeout(timeout);
    } catch (error) {
      error1(error.message);
    }
    
    setCreator('');
    setTitle('');
    setMessage('');
    setTags('');
  };

  const clear = (e) => {
    e.preventDefault();
    navigate('/', { replace: true });
}

  useEffect(() => {
    getpost();
  }, [])

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
    <div className='flex justify-center items-center gap-2w-screen h-[90vh] overflow-y-auto'>
      <div className='flex flex-col justify-center items-center gap-3 bg-zinc-600 m-1 md:m-5 mr-0 p-3 rounded-md md:w-1/2 w2/3'>
      <h2 className='mb-3 font-semibold text-2xl'>Update Memory</h2>
      <div className='relative flex flex-col justify-start bg-zinc-700 mt-5 rounded-md w-60 md:w-auto md:max-w-100 h-auto overflow-clip'>
        <img className='static bg-black opacity-70 rounded-md h-65 object-cover' src={post.ImageUrl} />
      </div>
      <form className="flex flex-col justify-center items-center gap-3 p-3 w-full text-white">
          <input onChange={(e) => {setCreator(e.target.value)}} value={creator} className="bg-zinc-800 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="creator" placeholder="Creator"/>
          <input onChange={(e) => {setTitle(e.target.value)}} value={title} className="bg-zinc-800 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="title" placeholder="Title"/>
          <input onChange={(e) => {setMessage(e.target.value)}} value={message} className="bg-zinc-800 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="message" placeholder="Message"/>
          <input onChange={(e) => {setTags(e.target.value)}} value={tags} className="bg-zinc-800 mx-[10px] px-4 py-3 rounded-md outline-none w-[97%]" type="text" name="tags" placeholder="Tags"/>
          <button onClick={uploadFiles} className="flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-700 mt-3 p-2 rounded-md w-full" type="submit" value="Upload">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
            <h1 className='font-semibold text-[1.2rem]'>Edit Post</h1></button>
        <button onClick={clear} className="flex justify-center items-center gap-2 bg-red-400 hover:bg-red-600 mt-3 p-2 rounded-md w-full" type="submit" value="Upload"><h1 className='font-semibold text-[1.2rem]'>Cancle</h1></button>
        </form>
        <ToastContainer/>
      </div>
    </div>
    </>
  )
};

export default Edit;
