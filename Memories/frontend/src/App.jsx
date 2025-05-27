
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import './App.css'
import Edit from './components/pages/Edit'
import Home from './components/pages/Home'
import Posts from './components/Posts/Posts'
import Form from './components/Forms/Form'
import Unauth from './components/Unauth'
const user = ""
const router = createBrowserRouter([
  {
    path: '/',
    element: [user ? <Home key={location.pathname} /> : <Navigate to={'/user'}/>] ,
    children: [
      {
        path: '/',
        element: [<Posts key={'1'}/>,user ? <Form key={'2'}/> : <Unauth key={'2'}/>],
         
      },
      {
        path: '/edit/:_id',
        element: <Edit />,
      },
    ]
  },
  {
    path: '/user',
    element: [user ? <Navigate to={'/'} key={5}/> : <Unauth key={4}/> ],
    children:[]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
