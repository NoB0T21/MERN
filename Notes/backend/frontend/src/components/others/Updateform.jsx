import { useContext, useEffect, useState } from 'react';
import {z} from 'zod';
import {PacmanLoader} from 'react-spinners';
import {api} from '../../utils/api';
import  usenote from '../../utils/api';
import { NotesContext } from '../../context/Dataprovider';
import { useNavigate, useParams } from 'react-router-dom';
import {toast, ToastContainer,Bounce} from 'react-toastify';

const formSchema = z.object({
  title: z.string().min(1, "Title required"),
  details: z.string().min(3,"Must be 3 characters long")
});

const Updateform = () => {
  const [title , setTitle] = useState('');
  const [details , setDetails] = useState('');
  const [error , setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [notesData, setNotesData] = useContext(NotesContext);
  const params = useParams();
  const navigate = useNavigate();

  const notify = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  },(setTimeout(function() {
      navigate('/')
    }, 2500)
));
const notifyerr = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
  const data = async () =>  {
    const dd = await api.get(`/read/${params._id}`)
    setTitle(dd.data.title)
    setDetails(dd.data.details)
  };
  
  useEffect(()=>{
    data()
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parserResult = formSchema.safeParse({title:title, details:details});
    if(!parserResult.success){
      const errorMessages = parserResult.error.flatten().fieldErrors;
      setError({
        title: errorMessages.title?.[0],
        details: errorMessages.details?.[0]
      });
      return;
    };
    setLoader(true);

    const formdata = {
      "title": title,
      "details": details}

    try{
      const {getnote} = usenote(setNotesData);
      const response = await api.put(`/edit/${params._id}`,formdata);
      getnote();
      if(!response)return;
      if(!response.data.success){
        notifyerr(response.data.message);
      }
      notify(response.data.message);
    }catch(err){
      console.log(err);
    }
    
    setTitle('');
    setDetails('');
    setError({});
    setLoader(false);
    
  }

  return (
    <div onSubmit={handleSubmit} className="form p-10 text-white">
      <form className='w-90 max-w-100' >
        {error.title === "" ? "": <p className='text-red-500'>{error.title}</p>}
          <input onChange={(e) => setTitle(e.target.value)} value={title} className="block w-full h-15 px-5 py-3 bg-zinc-800 outline-none rounded-md" type="text" name="filename" placeholder="title goes here..."/>
          {error.details === "" ? "": <p className='text-red-500 mt-3'>{error.details}</p>}
          <textarea onChange={(e) => setDetails(e.target.value)} value={details} className="block w-full h-85 mt-3 px-5 py-3 resize-none bg-zinc-800 outline-none rounded-md" name="details" placeholder="Write your details"></textarea>
          <button disabled={loader} className="bg-orange-500 text-md mt-3 p-2 rounded-md hover:bg-orange-400 hover:scale-110 transition-all duration-500 ease-in-out">{!loader && 'Update Notes'}{loader && <PacmanLoader color='#fff' size={12}/>}</button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Updateform;
