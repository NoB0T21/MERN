import {Link} from 'react-router-dom'
import {Grid,GridFill} from '../Icons/Icons'

const ProfileNav = () => {
  return (
    <>
        <div className='w-full h-full flex gap-2'>
            <div className='rounded-xl p-0 m-0 w-full h-full flex flex-col justify-center items-center gap-2'>
                <Link className='hover:bg-zinc-600 w-full h-full rounded-md flex items-center justify-center' to={'/user/profile'}>
                    {location.pathname === '/user/profile' ? <GridFill />:<Grid/>}
                </Link>
                <div className={`${location.pathname==='/user/profile'?'w-full':'w-0'} rounded-full mx-1 my-0 p-0 bg-white h-0.5 transition-(w) duration-200 ease-in-out`}></div>
            </div>
            <div className='rounded-xl p-0 m-0 w-full h-full flex flex-col justify-center items-center gap-2'>
                <Link className='hover:bg-zinc-600 w-full h-full rounded-md flex items-center justify-center' to={'/user/profile/future'}>
                    {location.pathname === '/user/profile/future' ? <GridFill/>:<Grid/>}
                </Link>
                <div className={`${location.pathname==='/user/profile/future'?'w-full':'w-0'} rounded-full mx-1 my-0 p-0 bg-white h-0.5 transition-(w) duration-200 ease-in-out`}></div>
            </div>
        </div>
    </>
  )
}

export default ProfileNav
