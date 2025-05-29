import { useContext } from 'react';
import logo from '../assets/Logo.png';
import {Link} from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import Profile from './Profile';

const Header = () => {
  const {userData} = useContext(DataContext);
  const user = userData.email_verified;
  return (
    <>
      <div className='flex justify-center items-center gap-5 bg-zinc-700 mx-10 md:mx-20 2xl:mx-55 xl:mx-25 mt-[15px] rounded-md'>
        <div className='flex justify-center mx-8'>
          <img className='mr-[15px] w-12 md:w-15 h-12 md:h-15' src={logo}/>
          <h1 className='font-bold text-4xl md:text-5xl'>Memories</h1>
        </div>
        <div className='flex justify-center items-center mx-8'>
          {user === true ?<Profile value={userData}/> : <Link className='bg-indigo-600 p-2 rounded-sm' to={'/user'}>sign in</Link>}
        </div>
      </div>
    </>
  )
};

export default Header;
