import Header from '../Header';
import {Outlet} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header/>
      <div className='flex md:flex-row flex-col justify-between gap-2 md:mx-20'>
        <Outlet />
      </div>
    </>
  )
};

export default Home;
