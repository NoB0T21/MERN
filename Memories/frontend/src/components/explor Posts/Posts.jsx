import { useContext, useEffect, useState } from 'react';
import Post from './post';
import { DataContext } from '../../context/DataProvider';
import { api } from '../../utils/api';
import PostSkeleton from '../PostSkeleton';
import {SyncLoader} from 'react-spinners'

const Posts = () => {
  const { postData, setPostData } = useContext(DataContext);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [poat , setPost] = useState([])

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const { data } = await api.get(`${import.meta.env.VITE_BASE_URL}/home?skip=${skip}`);
      if (!data || data.length === 0) {
        setHasMore(false);
        return;
      }
      

      setPostData(prev => {
  const merged = [...prev, ...data];
  const unique = Array.from(new Map(merged.map(post => [post._id, post])).values());
  return unique;
});
setPost(prev => {
  const merged = [...prev, ...data];
  const unique = Array.from(new Map(merged.map(post => [post._id, post])).values());
  return unique;
});

    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [skip]);

  const handleScroll = (e) => {
    const {scrollTop, scrollHeight, clientHeight} = e.target
     if (scrollTop + clientHeight >= scrollHeight - 100) {
    setSkip(prev => prev + 1);
  }
  };

  if (postData.length === 0 && loading) {
    return <PostSkeleton/>;
  }
  return (
    <div className='flex justify-center md:justify-start items-start gap-8 mt-3 rounded-lg w-full h-full'>
      <div className="flex flex-wrap justify-center md:justify-start items-start gap-8 rounded-lg w-full h-full overflow-scroll" onScroll={handleScroll}>
        {postData.map((e) => (
          <Post key={e._id} data={e} limit={poat.length} />
        ))}
        {loading && <SyncLoader color='#fff'/>}
      </div>
    </div>
  );
};

export default Posts;
