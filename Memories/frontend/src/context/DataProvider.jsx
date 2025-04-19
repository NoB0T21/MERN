import { createContext, useEffect, useState } from 'react';
import useData from '../utils/api';

export const DataContext = createContext();
const DataProvider = ({children}) => {
  const [postData, setPostData] = useState([]);
  const {getData} = useData(setPostData);
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      <DataContext.Provider value={[postData, setPostData]}>
        {children}
      </DataContext.Provider>
    </div>
  )
};

export default DataProvider;
