import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Form from './components/Form'
import List from './components/Lists'

function App() {

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-5 m-10'>
        <Header/>
        <Form/>
        <List/>
      </div>
    </>
  )
}

export default App
