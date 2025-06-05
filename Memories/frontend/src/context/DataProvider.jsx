import { createContext, useEffect, useState } from 'react';
import useData from '../utils/api';

export const DataContext = createContext();
const DataProvider = ({children}) => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const {getData} = useData(setPostData);
  useEffect(() => {
    getData();
  }, [location.pathname]);
  
  return (
    <div>
      <DataContext.Provider value={{postData, setPostData, userData, setUserData}}>
        {children}
      </DataContext.Provider>
    </div>
  )
};

export default DataProvider;
