import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Notes from './components/others/Notes'
import Edit from './components/others/Edit'
import Read from './components/Read'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children:[
      {
        path: '/',
        element: <Notes/>
      },
      {
        path: '/edit',
        element: <Edit/>
      },
    ]
  },
  {
    path: '/read',
    element: <Read/>
  }
])

function App() {

  return <RouterProvider router={router}/>
}

export default App
