import axios from "axios";

const URL=''

export const api = axios.create({baseURL: URL});

const usenote = (setNotesData) => {
  const getnote = async () => {
    const note = await axios.get(`${URL}/getnotes`);
    setNotesData(note.data);
  };
  return{getnote};
};

export default usenote;