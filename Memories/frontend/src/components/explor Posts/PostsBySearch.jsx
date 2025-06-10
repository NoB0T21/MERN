import { useContext } from "react";
import { DataContext } from '../../context/DataProvider';
import Post from './post';

const PostsBySearch = () => {
    const { searchData } = useContext(DataContext);
    console.log(searchData)
  return (
    <div className='flex justify-center md:justify-start items-start gap-8 mt-3 rounded-lg w-full h-full'>
      <div className="flex flex-wrap justify-center md:justify-start items-start gap-8 rounded-lg w-full h-full overflow-scroll">
        {searchData.map((e) => (
          <Post key={e._id} data={e} />
        ))}
      </div>
    </div>
  )
}

export default PostsBySearch
