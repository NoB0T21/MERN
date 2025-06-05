import {api} from '../utils/api.js'
import { useState } from 'react';

const Profile = (user) => {
  const [show, setShow] = useState(false);

  const logout = () =>{
    const user = api.get('/user/logout',{withCredentials: true})
    localStorage.removeItem('token')
  }
  return (
    <div className="relative flex justify-end items-center gap-2 w-1/2">
      <div className="w-1/2 font-semibold text-xl">
        {user.value.name||user.value.firstName}
      </div>
      <img onClick={()=>setShow(!show)} className="rounded-full w-15 h-15" src={`${user.value.picture}`}/>
      <div className={`-right-8 absolute bg-zinc-700 p-2 rounded-md w-[200px] h-auto ${show ? 'top-18' : '-top-40'} flex-col justify-start items-start gap-2 transition-(top) duration-250 ease-in-out`}>
        <div className='flex justify-center py-1 border-b-2 border-b-zinc-500'>Profile</div>
        <button className='py-1' onClick={logout}>logout</button>
      </div>
    </div>
  )
}

export default Profile
