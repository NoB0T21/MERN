import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

const useData = (setPostData) => {
    const getData = async () => {
      const note = await axios.get(`${import.meta.env.VITE_BASE_URL}/home`);
      setPostData(note.data);
    };
    return { getData };
  };

export default useData;