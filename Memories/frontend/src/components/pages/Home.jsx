import Form from '../Forms/Form';
import SearchForm from '../Forms/SearchForm';
import Header from '../NavHeader';
import Sidebar from '../Sidebar';
import {Outlet} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header/>
      <div className='flex md:flex-row flex-col justify-between gap-2 mx-10 md:mx-20 2xl:mx-55 xl:mx-25 mt-[15px] mb-10 h-full'>
        <div className='flex justify-start gap-6 h-[83vh]'>
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
