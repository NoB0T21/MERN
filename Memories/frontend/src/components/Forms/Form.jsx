import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { DataContext } from '../../context/DataProvider.jsx';
import { PulseLoader } from "react-spinners";
import {z} from 'zod';
import {ImageFill, Upload, Upload2, Close, Home, HomeFill, Globe, GlobeFill} from '../Icons/Icons.jsx';
import {Link} from 'react-router-dom'
import useData from '../../utils/api.js';
import axios from 'axios';

const formSchema = z.object({
  title: z.string().min(1,'Name Required'),
  files: z.instanceof(File, { message: 'A valid file is required' }),
});

const Form = () => {
  const {setPostData,userData} = useContext(DataContext);
  const [progress, setProgress] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({
    title:'',files:''
  });
  const [show, setShow] = useState(false);
  const [isloding, SetIsloding] = useState(false);
  const [formDatas, setFormData] = useState({
    name:userData?.name, title:'',message:'',tags:[],owner:userData?._id
  })
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
  });;
  const war = () => toast.warn('Atleast image field is require', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const notify = () => toast.success('Post created Sucessfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const handlefile = (e) => {setFiles(e.target.files[0])}

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
  
  const uploadFiles = async (e) => {
    e.preventDefault();
    const parserResult = formSchema.safeParse({title: formDatas.title,files});
    if(!parserResult.success){
      const errorMessage = parserResult.error.flatten().fieldErrors;
      setError({
        title: errorMessage.title,
        files: errorMessage.files
      });
    };
    if (files.length === 0) {
      war();
      return;
    };
    
    if (parserResult.success) {
      setError({ title: '', files: '' });
    }
    
    SetIsloding(true);

    const formData = new FormData();
    formData.append('creator', formDatas.name);
    formData.append('title', formDatas.title);
    formData.append('message', formDatas.message);
    formData.append('tags', JSON.stringify(formDatas.tags));
    formData.append('owner', formDatas.owner);
    formData.append('file', files);
    
  
    if(files.length  !== 0){
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload`,
          formData, 
          { headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
           },
           withCredentials: true,
            onUploadProgress: (progressEvent) => {
            const progresss = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(progresss)
          }}
        );
        
        setTimeout(() => {
          const {getData}=useData(setPostData);
          getData();
        },2000);
        
        if(response === undefined){
          const err = 'server is closed';
          error1(err);
          SetIsloding(false);
        }else{
          notify();
        }
      } catch (error) {
        error1(error.message);
        SetIsloding(false);
      } finally{
        setFiles([]);
        setError({title:'',files:''});
        setShow(false);
        SetIsloding(false);
        setProgress('');
        setFormData({name:userData?.name, title:'',message:'',tags:[],owner:userData?._id})
      }
    }
  };

  const clear = (e) => {
    e.preventDefault();
    setFiles([]);
    setError({title:'',files:''});
    setShow(false);
    SetIsloding(false);
    setProgress('');
    setFormData({name:userData?.name, title:'',message:'',tags:[],owner:userData?._id})
}

  return (
    <>
      <div className='hidden md:flex flex-col justify-center items-center gap-2 bg-[rgba(84,84,84,0.5)] shadow-xl backdrop-blur-5xl p-3 rounded-md w-65 lg:w-70 xl:w-75 max-w-130 h-2/3'>
        <h2 className='font-semibold text-2xl'>Create a Memory</h2>
        <form className="flex flex-col justify-center items-center gap-3 px-2 w-full text-white">
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
              {formDatas.tags.length > 0 && 
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
          {error.files === ''? '': <p className='text-red-500 text-sm'>{error.files}</p>}
          <button className='z-1 before:-z-1 before:absolute relative flex justify-center items-center gap-2 bg-indigo-700 before:bg-indigo-600 shadow-lg px-1 py-1 lg:py-2 w-full before:w-0 hover:before:w-full h-10 before:h-full overflow-hidden font-semibold text-[#fff] text-xl transition-all before:transition-all duration-300 before:duration-350'><ImageFill/> upload <input onChange={handlefile} className="absolute opacity-0 w-full h-full cursor-pointer" type="file" name="file" accept='image/*'/></button>
          <button disabled={isloding} onClick={uploadFiles} className="z-1 before:-z-1 before:absolute relative flex justify-center items-center gap-2 bg-indigo-700 before:bg-indigo-600 shadow-lg mt-2 p-1 xl:p-2 rounded-md w-full before:w-0 hover:before:w-full before:h-full overflow-hidden transition-all before:transition-all duration-300 before:duration-350" type="submit" value="Upload">
            {isloding && <><PulseLoader color="#fff"/><p>{progress}%</p></>}
            {!isloding && <>
              <Upload/><h1 className='font-semibold text-[1.1rem]'>Create Post</h1>
            </>}
          </button>
          <button onClick={clear} className="z-1 before:-z-1 before:absolute relative flex justify-center items-center gap-2 bg-red-500 before:bg-red-400 shadow-lg shadow-red-xl/30 mt-1 p-1 rounded-md w-full before:w-0 hover:before:w-full before:h-full overflow-hidden transition-all before:transition-all duration-300 before:duration-350" type="submit" value="Upload"><h1 className='font-semibold text-[1.2rem]'>Clear</h1></button>
        </form>
        <ToastContainer/>
      </div>
      <div className='md:hidden bottom-0 left-0 absolute flex justify-between items-center bg-zinc-600 px-5 rounded-t-sm w-screen h-14 max-h-18 overflow-hidden'>
        <Link className={`${location.pathname==='/'? 'bg-zinc-800 animate-bounce ':'bg-transparent'} flex justify-center items-center  w-13 h-13 rounded-full transition-(bg,mb) duration-200 ease-in-out`} to={'/'}>{location.pathname === '/' ? <HomeFill/>:<Home/>}</Link>
        <Link className={`${location.pathname==='/explore'? 'bg-zinc-800 animate-bounce ':'bg-transparent'} flex justify-center items-center  w-13 h-13 rounded-full transition-(bg,mb) duration-200 ease-in-out`} to={'/explore'}>{location.pathname === '/' ? <GlobeFill/>:<Globe/>}</Link>
        <button className='flex justify-center items-center' onClick={() => setShow(true)}>
          <Upload2/>
        </button>
        <Link className={`${location.pathname==='/user/profile'||location.pathname==='/user/profile/future'? 'bg-zinc-800 animate-bounce ':'bg-transparent'} flex justify-center items-center  w-13 h-13 rounded-full transition-(bg,mb) duration-200 ease-in-out`} to={'/user/profile'}><img className='rounded-full w-9 h-9' src={userData?.picture} alt='profile' /></Link>
      </div>
      <div className={`${show ? "top-0" : "top-500"} absolute left-0 bottom-0 md:hidden bg-[#19191cb9] w-full h-full z-1 p-15 backdrop-blur-sm transition-(top) duration-300 ease-in-out`}>
        <div className='flex justify-end w-full'>
          <button onClick={() => setShow(false)}>
            <Close/>
          </button>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 px-3 rounded-sm w-full h-110'>
          <h2 className='my-3 font-semibold text-2xl'>Create a Memory</h2>
          <form className="flex flex-col justify-center items-center gap-3 p-2 w-full text-white">
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, title: e.target.value})}} value={formDatas.title} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 peer-focus:border-indigo-500 rounded-sm text-gray-400 text-md peer-focus:text-[#fff] peer-valid:text-[#fff] scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Title</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, message: e.target.value})}} value={formDatas.message} required autoComplete="off"
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 peer-focus:border-indigo-500 rounded-sm text-gray-400 text-md peer-focus:text-[#fff] peer-valid:text-[#fff] scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Message</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onKeyDown={handleInputKeyDown} onChange={(e) => {handleInputChange(e)}} value={inputValue} required
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
              <div className="flex flex-wrap gap-2 mt-2">
                {formDatas.tags.map((tag, index) => (
                  <span key={index} className="flex items-center gap-1 bg-indigo-600 px-2 py-1 rounded-md text-white text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-red-300 hover:text-red-500"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            <label className="top-0 left-4 absolute bg-zinc-800 px-1 border border-zinc-800 peer-focus:border-indigo-500 rounded-sm text-gray-400 text-md peer-focus:text-[#fff] peer-valid:text-[#fff] scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Tags</span>
            </label>
          </div>
            {error.files === ''? '': <p className='text-red-500 text-sm'>{error.files}</p>}
            <button className='z-1 before:-z-1 before:absolute relative flex justify-center items-center gap-2 bg-indigo-700 before:bg-indigo-600 shadow-lg px-1 py-1 lg:py-2 w-full before:w-0 hover:before:w-full h-10 before:h-full overflow-hidden font-semibold text-[#fff] text-xl transition-all before:transition-all duration-300 before:duration-350'><ImageFill/> upload <input onChange={handlefile} className="absolute opacity-0 w-full h-full cursor-pointer" type="file" name="file" accept='image/*'/></button>
            <button disabled={isloding} onClick={uploadFiles} className="z-1 before:-z-1 before:absolute relative flex justify-center items-center gap-2 bg-indigo-700 before:bg-indigo-600 shadow-lg mt-2 p-1 xl:p-2 rounded-md w-full before:w-0 hover:before:w-full before:h-full overflow-hidden transition-all before:transition-all duration-300 before:duration-350" type="submit" value="Upload">
            {isloding && <PulseLoader color="#fff"/>}
            {!isloding && <>
              <Upload/><h1 className='font-semibold text-[1.1rem]'>Create Post</h1>
            </>}</button>
            <button onClick={clear} className="z-1 before:-z-1 before:absolute relative flex justify-center items-center gap-2 bg-red-500 before:bg-red-400 shadow-lg shadow-red-xl/30 mt-1 p-1 rounded-md w-full before:w-0 hover:before:w-full before:h-full overflow-hidden transition-all before:transition-all duration-300 before:duration-350" type="submit" value="Upload"><h1 className='font-semibold text-[1.2rem]'>Clear</h1></button>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </>
  )
};

export default Form;
