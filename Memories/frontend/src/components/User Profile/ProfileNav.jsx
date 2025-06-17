import {Link} from 'react-router-dom'
import {Grid,GridFill} from '../Icons/Icons'

const ProfileNav = () => {
  return (
    <>
        <div className='flex gap-2 w-full h-full'>
            <div className='flex flex-col justify-center items-center gap-2 m-0 p-0 rounded-xl w-full h-full'>
                <Link className='flex justify-center items-center hover:bg-zinc-600 rounded-md w-full h-full' to={'/user/profile'}>
                    {location.pathname === '/user/profile' ? <GridFill />:<Grid/>}
                </Link>
                <div className={`${location.pathname==='/user/profile'?'w-full':'w-0'} rounded-full mx-1 my-0 p-0 bg-white h-0.5 transition-(w) duration-200 ease-in-out`}></div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 m-0 p-0 rounded-xl w-full h-full'>
                <Link className='flex justify-center items-center hover:bg-zinc-600 rounded-md w-full h-full' to={'/user/profile/future'}>
                    {location.pathname === '/user/profile/future' ? <GridFill/>:<Grid/>}
                </Link>
                <div className={`${location.pathname==='/user/profile/future'?'w-full':'w-0'} rounded-full mx-1 my-0 p-0 bg-white h-0.5 transition-(w) duration-200 ease-in-out`}></div>
            </div>
        </div>
    </>
  )
}

export default ProfileNav
