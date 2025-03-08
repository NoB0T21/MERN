import { lazy, Suspense } from 'react'
import './App.css'
import Header from './components/Header'
import Form from './components/Form'
const List = lazy(() => import('./components/Lists'))

function App() {
  
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-5 m-10'>
        <Header/>
        <Form />
        <Suspense>
          <List/>
        </Suspense>
      </div>
    </>
  )
}

export default App
