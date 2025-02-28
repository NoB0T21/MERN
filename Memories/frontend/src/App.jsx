import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Posts from './components/Posts/Posts'
import Form from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <div className='flex justify-between mx-30 h-full '>
        <Posts/>
        <Form/>
      </div>
    </>
  )
}

export default App
