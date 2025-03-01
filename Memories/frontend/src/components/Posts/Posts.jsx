import React, { useContext } from 'react'
import Post from './post'
import { DataContext } from '../../context/DataProvider'

const Posts = () => {
  const [postData] = useContext(DataContext)
  if (!postData.length) {
    return <p>Loading posts...</p>; // Show loading message while waiting for data
  }
  return (
    <div className='flex flex-wrap justify-start items-start mt-5 gap-5 overflow-y-auto'>
      {postData.slice().reverse().map((e, idx) => (
        <Post key={idx} data={e} />
      ))}
    </div>
  )
}

export default Posts
