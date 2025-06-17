import { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {api} from '../../utils/api.js';
import { ToastContainer, toast } from 'react-toastify';
import { DataContext } from '../../context/DataProvider';
import { EditIcon } from '../Icons/Icons.jsx';
import useData from '../../utils/api.js';


const Edit = () => {
  const navigate = useNavigate();
  const {setPostData} = useContext(DataContext);
  const [post, setPost] = useState([]);
  const [formDatas, setFormData] = useState({
    name:'', title:'',message:'',tags:[]
  })
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState('');

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

  const handleInputChange = (e) => {setInputValue(e.target.value);};

  const handleInputKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ',' && inputValue.trim() !== '') {
        const newTags = inputValue
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => (tag.startsWith('#') ? tag : `#${tag}`))
      .filter(tag => !formDatas.tags.includes(tag));
      
      if (newTags.length > 0) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, ...newTags],
        }));
      }
        setInputValue('');
      }
    };
  const removeTag = (indexToRemove) => {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.filter((_, index) => index !== indexToRemove),
      }));
    };

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
    setFormData({name:`${data.creator}`, title:`${data.title}`,message:`${data.message}`,tags:data.tags})
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    setProgress(10)
    const formData = {
      'creator': formDatas.name,
      'title': formDatas.title,
      'message': formDatas.message,
      'tags': formDatas.tags,
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await api.patch(`${import.meta.env.VITE_BASE_URL}/update/${post._id}`,
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
      setTimeout(() => {
        getData();
        setProgress(100);
        navigate('/user/profile', { replace: true });
      }, 1000);
    } catch (error) {
      error1(error.message);
    }
    
    setFormData({name:`${post.creator}`, title:`${post.title}`,message:`${post.message}`,tags:post.tags})
  };

  const clear = (e) => {
    e.preventDefault();
    navigate('/', { replace: true });
    setFormData({name:`${post.creator}`, title:`${post.title}`,message:`${post.message}`,tags:post.tags})
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
    <div className='flex items-start gap-2 w-full h-[90vh] overflow-y-auto'>
      <div className='flex flex-col justify-center items-center gap-3 bg-zinc-600 m-1 md:m-5 mr-0 p-3 rounded-md'>
      <h2 className='mb-3 font-semibold text-2xl'>Update Memory</h2>
      <div className='relative flex flex-col justify-start bg-zinc-700 mt-5 rounded-md w-60 md:w-auto md:max-w-100 h-auto overflow-clip'>
        <img className='static bg-black opacity-70 rounded-md h-65 object-cover' src={post.ImageUrl} />
      </div>
      <form className="flex flex-col justify-center items-center gap-3 p-3 w-full text-white">
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, title: e.target.value})}} value={formDatas.title} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 peer-focus:border-indigo-500 rounded-sm text-gray-400 text-md peer-focus:text-[#fff] peer-valid:text-[#fff] scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Title</span>
            </label>
          </div>
          <div className="relative w-full">
            <textarea onChange={(e) => {setFormData({...formDatas, message: e.target.value})}} value={formDatas.message} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 peer-focus:border-indigo-500 rounded-sm text-gray-400 text-md peer-focus:text-[#fff] peer-valid:text-[#fff] scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Message</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onKeyDown={handleInputKeyDown} onChange={(e) => {handleInputChange(e)}} value={inputValue} required
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
              {formDatas.tags?.length > 0 && 
              <>
                <div className="flex flex-wrap gap-2 mt-2 w-full h-20 overflow-auto">
                  {formDatas.tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-full h-8 text-white text-sm">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="flex justify-center items-center bg-zinc-700 rounded-full w-4 h-4"
                      >
                        <span>x</span>
                      </button>
                    </span>
                  ))}
                </div>
              </>
              }
            <label className="top-0 left-4 absolute bg-zinc-800 px-1 border border-zinc-800 peer-focus:border-indigo-500 rounded-sm text-gray-400 text-md peer-focus:text-[#fff] peer-valid:text-[#fff] scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Tags</span>
            </label>
          </div>
          <button onClick={uploadFiles} className="flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-700 mt-3 p-2 rounded-md w-full" type="submit" value="Upload">
            <EditIcon/>
            <h1 className='font-semibold text-[1.2rem]'>Edit Post</h1>
          </button>
        <button onClick={clear} className="flex justify-center items-center gap-2 bg-red-400 hover:bg-red-600 mt-3 p-2 rounded-md w-full" type="submit" value="Upload"><h1 className='font-semibold text-[1.2rem]'>Cancle</h1></button>
        </form>
        <ToastContainer/>
      </div>
    </div>
    </>
  )
};

export default Edit;
