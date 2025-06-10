import { createContext, useEffect, useState } from 'react';
import useData from '../utils/api';

export const DataContext = createContext();
const DataProvider = ({children}) => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [homePost, setHomePost] = useState([]);
  const {getData} = useData(setPostData,setHomePost);
  useEffect(() => {
    getData();
    getData();
  }, [location.pathname]);
  
  return (
    <div>
      <DataContext.Provider value={{postData, setPostData, userData, setUserData,searchData, setSearchData,homePost, setHomePost}}>
        {children}
      </DataContext.Provider>
    </div>
  )
};

export default DataProvider;
