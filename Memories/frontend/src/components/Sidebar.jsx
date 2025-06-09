import {Globe, GlobeFill, Home,HomeFill} from './Icons/Icons'
import {Link} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col justify-start gap-8 items-center p-2 bg-zinc-700 ml-10 md:ml-20 2xl:ml-55 xl:ml-25 mt-[15px] rounded-md w-25 mb-1'>
      <div className={`${location.pathname==='/'?'bg-zinc-800':''} flex justify-center items-center w-15 h-15 rounded-full transition-(bg) duration-300 ease-in-out`}>
        <Link className={`${location.pathname==='/'?'animate-bounce':''}`} to={'/'}>{location.pathname==='/'?<HomeFill/>:<Home/>}</Link>
      </div>
      <div className={`${location.pathname==='/explore'?'bg-zinc-800':''} flex justify-center items-center w-15 h-15 rounded-full transition-(bg) duration-300 ease-in-out`}>
        <Link className={`${location.pathname==='/explore'?'animate-bounce':''}`} to={'/explore'}>{location.pathname==='/'?<GlobeFill/>:<Globe/>}</Link>
      </div>
    </div>
  )
}

export default Sidebar
