import { useContext, useState } from 'react';
import {z} from 'zod';
import {PacmanLoader} from 'react-spinners';
import {api} from '../../utils/api';
import  usenote from '../../utils/api';
import { NotesContext } from '../../context/Dataprovider';
import {toast, ToastContainer,Bounce} from 'react-toastify';

const formSchema = z.object({
  title: z.string().min(1, "Title required"),
  details: z.string().min(3,"Must be 3 characters long")
});

const Form = () => {
  const [title , setTitle] = useState('');
  const [details , setDetails] = useState('');
  const [error , setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [notesData, setNotesData] = useContext(NotesContext);

  const notify = (message) => toast.success(message, {
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
      "details": details};

    try{
      const {getnote} = usenote(setNotesData);
      const response = await api.post(`/create`,formdata);
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
            <textarea onChange={(e) => setDetails(e.target.value)} value={details} className="block w-full h-85 px-5 py-3 resize-none bg-zinc-800 outline-none rounded-md" name="details" placeholder="Write your details"></textarea>
            <button disabled={loader} className="bg-color text-md mt-3 p-2 rounded-md hover:scale-110 hover:text-xl transition-all duration-500 ease-in-out">{!loader && 'Create Notes'}{loader && <PacmanLoader color='#fff' size={12}/>}</button>
        </form>
        <ToastContainer/>
    </div>
  );
};

export default Form;
