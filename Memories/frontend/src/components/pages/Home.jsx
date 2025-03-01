import React from 'react'
import Header from '../Header'

import {Outlet} from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Header/>
      <div className='flex justify-between gap-3 mx-30 h-full'>
        <Outlet />
      </div>
    </>
  )
}

export default Home
