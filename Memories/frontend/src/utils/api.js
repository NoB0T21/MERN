import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

const useData = (setPostData,limit) => {
    const getData = async () => {

        const note = await axios.get(`${import.meta.env.VITE_BASE_URL}/home?limit=${limit||1}`);
        setPostData(prev => {
          const merged = [...prev, ...note.data];
          const unique = Array.from(new Map(merged.map(post => [post._id, post])).values());
          return unique;
        });

    };
    return { getData };
  };

export default useData;