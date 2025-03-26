import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NotesAnime from './components/others/NotesAnime';
import ReadAnime from './components/ReadAnime';
import Edit from './components/Edits';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children:[
      {
        path: '/',
        element: <NotesAnime/>
      }
    ]
  },
  {
    path: '/edit/:_id',
    element: <Edit/>,
  },
  {
    path: '/read/:_id',
    element: <ReadAnime/>
  }
]);

function App() {
  return <RouterProvider router={router}/>
};

export default App;
