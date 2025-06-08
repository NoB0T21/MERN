import {api} from '../utils/api.js'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Profile = (user) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const logout = () =>{
    const user = api.get('/user/logout',{withCredentials: true})
    localStorage.removeItem('token')
    setTimeout(() => {
        navigate('/user', { replace: true });
    },1000);
  }
  return (
    <div className="relative flex justify-end items-center gap-2 w-1/2">
      <div className="w-1/2 font-semibold text-xl">
        {user.value.name||user.value.firstName+' '+user.value.lastName}
      </div>
      <img onClick={()=>setShow(!show)} className="rounded-full w-15 h-15" src={`${user.value.picture}`}/>
      <div className={`-right-8 absolute bg-zinc-700 p-2 rounded-md w-[200px] h-auto ${show ? 'top-18' : '-top-40'} flex-col justify-start items-start gap-2 transition-(top) duration-250 ease-in-out`}>
        <Link to={'/user/profile'} className='flex justify-center hover:bg-zinc-600 py-1 border-b-2 border-b-zinc-500 rounded-md'>Profile</Link>
        <button className='hover:bg-zinc-600 py-1 rounded-md w-full' onClick={logout}>logout</button>
      </div>
    </div>
  )
}

export default Profile
