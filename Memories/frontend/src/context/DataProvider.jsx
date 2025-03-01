import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const DataContext = createContext()
const DataProvider = ({children}) => {
    const [postData, setPostData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/home");
            setPostData(response.data || []);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <div>
      <DataContext.Provider value={[postData, setPostData]}>
        {children}
      </DataContext.Provider>
    </div>
  )
}

export default DataProvider
