import { useContext } from 'react';
import Post from './post';
import { DataContext } from '../../context/DataProvider';

const Posts = () => {
  const [postData,setPostData] = useContext(DataContext);
  if (postData.length === 0) {
    return <p>Loading posts...</p>;
  };
  return (
    <div className='flex flex-wrap justify-center md:justify-start items-start gap-12 mt-3 rounded-lg h-[85vh] md:h-[88vh] overflow-auto'>
      {postData.slice().reverse().map((e) => {
        return <Post key={e._id} data={e} />
      })}
    </div>
  )
};

export default Posts;
