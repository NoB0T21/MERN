import PostsBySearch from '../explor Posts/PostsBySearch';
import Posts from '../explor Posts/Posts';

const Explore = () => {
  return (
    <>
      <div className='flex md:flex-row flex-col justify-between gap-2 mt-[15px] w-full h-full'>
        {location.pathname==='/explore'?<Posts />:<PostsBySearch />}
      </div>
    </>
  )
}

export default Explore
