import Form from '../Forms/Form';
import SearchForm from '../Forms/SearchForm';
import Header from '../NavHeader';
import Sidebar from '../Sidebar';
import {Outlet} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header/>
      <div className='flex md:flex-row flex-col justify-between gap-2 mx-5 md:mx-10 2xl:mx-55 xl:mx-25 mt-[15px] mb-10 h-full'>
        <div className='flex justify-start gap-6 h-[83vh]'>
          <div className={`${(location.pathname==='/user/profile'||location.pathname==='/user/profile/future') && 'top-80 right-400'} ${(location.pathname==='/') && 'top-180 right-100'} ${(location.pathname==='/explore' || location.pathname==='/explore/search') && '-top-20 right-20'} -z-1 absolute bg-fuchsia-700 blur-3xl rounded-full w-120 h-120 transition-all duration-300 ease-in-out`}></div>
          <div className={`${(location.pathname==='/user/profile'||location.pathname==='/user/profile/future') && 'top-180 right-0 md:right-100'} ${(location.pathname==='/') && 'top-20 right-70'} ${(location.pathname==='/explore' || location.pathname==='/explore/search') && 'top-200 right-200'} -z-1 absolute bg-fuchsia-700 blur-3xl rounded-full w-80 h-80 transition-all duration-300 ease-in-out`}></div>
          <div className={`${(location.pathname==='/user/profile'||location.pathname==='/user/profile/future') && 'top-20 right-80'} ${(location.pathname==='/') && 'top-50 right-400'} ${(location.pathname==='/explore' || location.pathname==='/explore/search') && 'top-80 right-400'} -z-1 absolute bg-fuchsia-700 blur-3xl rounded-full w-90 h-90 transition-all duration-300 ease-in-out`}></div>
          <Sidebar/>
          <Outlet />
        </div>
        <div className='flex flex-col items-start gap-5 h-full'>
          <SearchForm/>
          <Form/>
        </div>
      </div>
    </>
  )
};

export default Home;
