import axios from "axios";


export const api = axios.create({baseURL: import.meta.env.VITE_URI});

const usenote = (setNotesData) => {
  const getnote = async () => {
    const note = await axios.get(`${import.meta.env.VITE_URI}/getnotes`);
    setNotesData(note.data);
  };
  return{getnote};
};

export default usenote;