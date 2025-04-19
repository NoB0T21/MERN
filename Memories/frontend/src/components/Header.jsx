import logo from '../assets/Logo.png';

const Header = () => {
  return (
    <div className='flex justify-center items-center bg-zinc-700 mx-10 md:mx-20 mt-[15px] rounded-md'>
      <h1 className='font-bold text-4xl md:text-5xl'>Memories</h1>
      <img className='ml-[15px] w-12 md:w-15 h-12 md:h-15' src={logo}/>
    </div>
  )
};

export default Header;
