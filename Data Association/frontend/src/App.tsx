import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './components/pages/Home';
import Signup from './components/other/Signup';
import Signin from './components/other/Signin';
import { jwtDecode } from 'jwt-decode';
import { getToken } from './utils/auth';

const token = await getToken();
console.log(token.data)
const userinfo = 'token ? jwtDecode(token) : null;'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path:'/signup',
        element: <Signup/>
      },
      {
        path:'/signin',
        element: <Signin/>
      }
    ]
  },
  {
    path: '/g',
    element: userinfo ?<Signup/> :<Signin/> ,
  },
]);

function App() {
  return <RouterProvider router={router}/>
};

export default App;
