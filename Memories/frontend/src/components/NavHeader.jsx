import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import logo from '../assets/Logo.png';
import Profile from './Profile';

const Header = () => {
  const {userData} = useContext(DataContext);
  return (
    <>
      <div className='flex justify-between bg-zinc-700 mx-10 md:mx-20 2xl:mx-55 xl:mx-25 mt-[15px] rounded-md'>
        <div className='flex justify-start items-center gap-4 mx-8 w-1/2'>
          <img className='w-12 md:w-15 h-12 md:h-15' src={logo}/>
          <h1 className='font-bold text-4xl md:text-5xl'>Memories</h1>
        </div>
        <div className='hidden md:flex justify-end items-center mx-8 w-1/2'>
          {userData?._id ?<Profile value={userData}/> : <Link className='bg-indigo-600 p-2 rounded-sm w-20 xl:w-30 text-xl' to={'/user'}>sign in</Link>}
        </div>
      </div>
    </>
  )
};

export default Header;
