import { useContext } from 'react';
import Post from './post';
import { DataContext } from '../../context/DataProvider';

const Posts = () => {
  const {postData} = useContext(DataContext);
  if (postData.length === 0) {
    return <p>Loading posts...</p>;
  };
  return (
    <div className='flex justify-center md:justify-start items-start gap-8 mt-3 mx-10 md:mx-20 2xl:mx-55 xl:mx-25 rounded-lg h-[92.43vh] md:h-[90vh]'>
      <div className="w-full h-[83%] justify-center items-start rounded-lg flex flex-wrap gap-8 overflow-auto">{postData.slice().reverse().map((e) => {return <Post key={e._id} data={e} />})}</div>
    </div>
  )
};

export default Posts;
