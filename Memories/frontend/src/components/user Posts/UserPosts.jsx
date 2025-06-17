import { Outlet } from 'react-router-dom';
import ProfileNav from '../User Profile/ProfileNav';
import UserProfile from '../User Profile/UserProfile';

const UserPosts = () => {
  return (
    <>
      <div className='flex justify-center md:justify-start md:items-start mt-3 rounded-lg w-full h-[95vh] md:h-[100vh]'>
        <div className="flex flex-wrap justify-center items-start gap-6 rounded-lg w-full h-[83%] overflow-x-hidden">
          <div className='w-full h-18 md:h-50'><UserProfile/></div>
          <div className='top-0 z-1 sticky bg-zinc-800 m-0 p-0 border-zinc-800 border-b-1 rounded-md w-full h-10 md:h-15'><ProfileNav/></div>
          <div className='w-full h-full'><Outlet/></div>
        </div>
      </div>
    </>
  )
}

export default UserPosts
