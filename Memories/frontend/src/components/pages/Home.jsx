import Form from '../Forms/Form';
import Header from '../NavHeader';
import {Outlet} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header/>
      <div className='flex md:flex-row flex-col justify-between gap-2 mt-[15px] h-full'>
        <Outlet />
        <Form/>
      </div>
    </>
  )
};

export default Home;
