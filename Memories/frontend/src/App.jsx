
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Edit from './components/pages/Edit'
import Home from './components/pages/Home'
import Posts from './components/Posts/Posts'
import Form from './components/Form'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: '/',
        element: [<Posts key={'1'}/>,<Form key={'2'}/>],
         
      },
      {
        path: '/edit/:_id',
        element: <Edit/>,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
