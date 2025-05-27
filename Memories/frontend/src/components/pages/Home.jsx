import Header from '../NavHeader';
import {Outlet} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header/>
      <div className='flex md:flex-row flex-col justify-between gap-2 md:mx-20 2xl:mx-55 xl:mx-25'>
        <Outlet />
      </div>
    </>
  )
};

export default Home;
