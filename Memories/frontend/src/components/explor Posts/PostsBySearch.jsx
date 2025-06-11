import { useContext } from "react";
import { DataContext } from '../../context/DataProvider';
import Post from './post';
import UserProfile from "../UserProfile";

const PostsBySearch = () => {
    const { searchData } = useContext(DataContext);
  return (
    <div className='flex flex-col justify-center md:justify-start items-start gap-8 mt-3 rounded-lg w-full h-full'>
      {searchData.profile.length>0 && 
      <>
        <div className='p-2 flex flex-col gap-5 justify-start items-center bg-zinc-800 rounded-md h-80 w-full overflow-y-scroll'>
          {searchData.profile?.map((profile)=>(<UserProfile key={profile._id} data={profile}/>))}
        </div>
      </>}
      <div className="flex flex-wrap justify-center md:justify-start items-start gap-8 rounded-lg w-full h-full overflow-scroll">
        {searchData.Posts?.map((e) => (
          <Post key={e._id} data={e} />
        ))}
      </div>
    </div>
  )
}

export default PostsBySearch
