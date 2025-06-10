import {Globe, GlobeFill, Home,HomeFill} from './Icons/Icons'
import {Link} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col justify-start items-center gap-8 bg-zinc-700 mt-[15px] mb-1 p-2 rounded-md w-25'>
      <div className={`${location.pathname==='/'?'bg-zinc-800':''} flex justify-center items-center w-15 h-15 rounded-full transition-(bg) duration-300 ease-in-out`}>
        <Link className={`${location.pathname==='/'?'animate-bounce':''}`} to={'/'}>{location.pathname==='/'?<HomeFill/>:<Home/>}</Link>
      </div>
      <div className={`${location.pathname==='/explore'||location.pathname==='/explore/search'?'bg-zinc-800':''} flex justify-center items-center w-15 h-15 rounded-full transition-(bg) duration-300 ease-in-out`}>
        <Link className={`${location.pathname==='/explore'||location.pathname==='/explore/search'?'animate-bounce':''}`} to={'/explore'}>{location.pathname==='/'?<GlobeFill/>:<Globe/>}</Link>
      </div>
    </div>
  )
}

export default Sidebar
