import { useContext, useEffect, useState, useRef } from 'react';
import Post from './post';
import { DataContext } from '../../context/DataProvider';
import { api } from '../../utils/api';

const Posts = () => {
  const { userData,homePost, setHomePost } = useContext(DataContext);
  const [skip, setSkip] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    if (!hasMore) return;
    try {
      const token = localStorage.getItem('token');
      const ids = userData?.following
      const data  = await api.post(`${import.meta.env.VITE_BASE_URL}/users/byIds?skip=${skip}`,
        ids,
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (!data.data || data.data.length === 0) {
        setHasMore(false);
        return;
      }
      
      setHomePost(prev => {
        const merged = [...prev, ...data.data];
        const unique = Array.from(new Map(merged.map(post => [post._id, post])).values());
        return unique;
      });

    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleScroll = (e) => {
    const {scrollTop, scrollHeight, clientHeight} = e.target
     if (scrollTop + clientHeight >= scrollHeight - 100) {
    setSkip(prev => prev + 1);
  }
  };

  return (
    <div className='flex justify-center md:justify-start items-start gap-8 mt-3 rounded-lg w-full h-full'>
      <div className="flex flex-wrap justify-center md:justify-start items-start gap-8 rounded-lg w-full h-full overflow-scroll" onScroll={handleScroll}>
        {homePost.map((e) => (
          <Post key={e._id} data={e} limit={homePost.length} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
