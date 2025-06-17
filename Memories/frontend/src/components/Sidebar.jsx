import { useContext } from 'react'
import {Globe, GlobeFill, Home,HomeFill} from './Icons/Icons'
import {Link} from 'react-router-dom'
import {DataContext} from '../context/DataProvider'
const Sidebar = () => {
  const {userData} = useContext(DataContext)
  return (
    <div className='hidden md:flex flex-col justify-start items-center gap-8 bg-[rgba(84,84,84,0.5)] shadow-xl backdrop-blur-5xl mt-[15px] mb-1 p-2 rounded-md w-25 h-1/3'>
      <div className={`${location.pathname==='/'?'bg-zinc-800':''} flex justify-center items-center w-15 h-15 rounded-full transition-(bg) duration-300 ease-in-out`}>
        <Link className={`${location.pathname==='/'?'animate-bounce':''}`} to={'/'}>{location.pathname==='/'?<HomeFill/>:<Home/>}</Link>
      </div>
      <div className={`${location.pathname==='/explore'||location.pathname==='/explore/search'?'bg-zinc-800':''} flex justify-center items-center w-15 h-15 rounded-full transition-(bg) duration-300 ease-in-out`}>
        <Link className={`${location.pathname==='/explore'||location.pathname==='/explore/search'?'animate-bounce':''}`} to={'/explore'}>{location.pathname==='/explore'||location.pathname==='/explore/search'?<GlobeFill/>:<Globe/>}</Link>
      </div>
      <div className={`${location.pathname==='/user/profile'||location.pathname==='/user/profile/future'?'bg-zinc-800':''} flex justify-center items-center w-15 h-15 rounded-full transition-(bg) duration-300 ease-in-out`}>
        <Link className={`${location.pathname==='/user/profile'||location.pathname==='/user/profile/future'? 'animate-bounce':''}`} to={'/user/profile'}><img className='rounded-full w-9 h-9' src={userData?.picture} alt='profile' /></Link>
      </div>
    </div>
  )
}

export default Sidebar
