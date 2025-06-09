import Form from '../Forms/Form';
import Header from '../NavHeader';
import Sidebar from '../Sidebar';
import {Outlet} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header/>
      <div className='flex md:flex-row flex-col justify-between gap-2 mt-[15px] h-full mb-10'>
        <div className='flex gap-6 justify-start w-full h-[83vh]'>
          <Sidebar/>
          <Outlet />
        </div>
        <Form/>
      </div>
    </>
  )
};

export default Home;
