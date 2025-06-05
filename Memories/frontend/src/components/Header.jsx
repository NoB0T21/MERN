import logo from '../assets/Logo.png';

const Header = () => {
  return (
    <>
      <div className='flex justify-center items-center bg-zinc-700 mx-5 md:mx-20 mt-[15px] rounded-md'>
        <img className='mr-[15px] w-12 md:w-15 h-12 md:h-15' src={logo}/>
        <h1 className='font-bold text-4xl md:text-5xl'>Memories</h1>
      </div>
    </>
  )
};

export default Header;
