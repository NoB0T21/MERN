import React, { createContext, useState } from 'react'
export const PostsDataContext = createContext()

const PostsContext = ({children}) => {
    const [userData, setUserData] = useState("");
  return (
    <div>
      <PostsDataContext.Provider value={[userData, setUserData]}>
        {children}
      </PostsDataContext.Provider>
    </div>
  )
}

export default PostsContext
