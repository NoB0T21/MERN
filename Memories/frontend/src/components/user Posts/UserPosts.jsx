import { Outlet } from 'react-router-dom';
import ProfileNav from '../User Profile/ProfileNav';
import UserProfile from '../User Profile/UserProfile';

const UserPosts = () => {
  return (
    <>
      <div className='w-full flex justify-center md:justify-start md:items-start mt-3 rounded-lg h-[95vh] md:h-[100vh] '>
        <div className="w-full h-[83%] justify-center items-start rounded-lg flex flex-wrap gap-6 overflow-x-hidden">
          <div className='w-full h-18 md:h-50'><UserProfile/></div>
          <div className=' w-full h-10 md:h-15 sticky top-0 z-1 rounded-t-sm bg-[#19191c] border-b-1 m-0 border-zinc-800 p-0'><ProfileNav/></div>
          <div className='w-full h-full'><Outlet/></div>
        </div>
      </div>
    </>
  )
}

export default UserPosts
