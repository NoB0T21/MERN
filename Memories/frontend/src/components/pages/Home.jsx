import Header from '../NavHeader';
import {Outlet} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header/>
      <div className='flex relative md:flex-row flex-col justify-between gap-2 mt-[15px]'>
        <Outlet />
      </div>
    </>
  )
};

export default Home;
