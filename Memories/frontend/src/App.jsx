import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { verifyGoogleToken, verifyToken } from './utils/google.verification';
import { useContext, useEffect, useState } from 'react';
import Edit from './components/pages/Edit';
import Home from './components/pages/Home';
import Posts from './components/Posts/Posts';
import Form from './components/Forms/Form';
import Unauth from './components/Unauth';
import Filler from './components/Filler';
import UserPosts from './components/user Posts/PostsGrid';
import './App.css';
import { DataContext } from './context/DataProvider';
import Profile from './components/pages/Profile';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {setUserData} = useContext(DataContext);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        let userInfo = await verifyToken(token)
        if(!userInfo?.email){
          userInfo = await verifyGoogleToken(token);
          setUser(userInfo);
          setUserData(userInfo)
        }
        setUser(userInfo);
        setUserData(userInfo)
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    checkUser();
  }, [location.pathname]);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={<Home/>}
      >
        <Route
          index
          element={
            <>
              <Posts />
              {user ? <Form /> : <Filler />}
            </>
          }
        />
        <Route
          path="edit/:_id"
          element={user ? <Edit /> : <Navigate to="/user" />}
        />
      </Route>
      <Route
        path="/user"
        element={user ? <Navigate to="/" /> : <Unauth />}
      />
      <Route
        path='/user/Profile'
        element={user ? <Profile/> : <Navigate to='/user'/>}
      >
        <Route
          path='/user/Profile'
          element= {<UserPosts/>}
        />
        <Route
          path='/user/Profile/future'
          element= {<Form/>}
        />
      </Route>
    </Routes>
  );
}

export default App;