import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import NotesAnime from './components/others/NotesAnime'
import EditAnime from './components/others/EditAnime'
import ReadAnime from './components/ReadAnime'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children:[
      {
        path: '/',
        element: <NotesAnime/>
      },
      {
        path: 'edit/:_id',
        element: <EditAnime/>
      },
    ]
  },
  {
    path: '/read/:_id',
    element: <ReadAnime/>
  }
])

function App() {

  return <RouterProvider router={router}/>
}

export default App
