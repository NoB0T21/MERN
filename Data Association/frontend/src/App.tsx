import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './components/pages/Home';
import Signup from './components/other/Signup';
import Signin from './components/other/Signin';
;

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
]);

function App() {
  return <RouterProvider router={router}/>
};

export default App;
