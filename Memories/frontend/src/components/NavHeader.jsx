import { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import logo from '../assets/Logo.png';
import Profile from './Profile';
import { api } from '../utils/api';

const Header = () => {
  const navigate = useNavigate();
  const {userData} = useContext(DataContext);

  const logout = () =>{
      const user = api.get('/user/logout',{withCredentials: true})
      localStorage.removeItem('token')
      setTimeout(() => {
          navigate('/user', { replace: true });
      },1000);
    }

  return (
    <>
      <div className='flex justify-between bg-zinc-700 mx-5 md:mx-10 2xl:mx-55 xl:mx-25 mt-[15px] rounded-md'>
        <div className='flex justify-start items-center gap-4 mx-2 w-full md:mx-8 md:w-1/2'>
          <img className='w-12 md:w-15 h-12 md:h-15' src={logo}/>
          <h1 className='font-bold text-4xl md:text-5xl'>Memories</h1>
        </div>
        <div className='flex md:hidden justify-end m-3'>
          <button className=' bg-red-600 p-1 rounded-md' onClick={logout}>logout</button>
        </div>
        <div className='hidden md:flex justify-end items-center mx-8 w-1/2'>
          {userData?._id ?<Profile value={userData}/> : <Link className='bg-indigo-600 p-2 rounded-sm w-20 xl:w-30 text-xl' to={'/user'}>sign in</Link>}
        </div>
      </div>
    </>
  )
};

export default Header;
