import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { verifyGoogleToken, verifyToken } from './utils/google.verification';
import { useContext, useEffect, useState } from 'react';
import Edit from './components/pages/Edit';
import Home from './components/pages/Home';
import Posts from './components/Posts/Posts';
import Unauth from './components/Unauth';
import UserPosts from './components/user Posts/PostsGrid';
import './App.css';
import { DataContext } from './context/DataProvider';
import Profile from './components/pages/Profile';
import Explore from './components/pages/Explore';
import ViewPost from './components/pages/ViewPost';
import Follower from './components/pages/Follower';
import Following from './components/pages/Following';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {setUserData,signinMethod} = useContext(DataContext);

  useEffect(() => {
    const checkUser = async () => {
      const method = signinMethod
      const token = localStorage.getItem("token");
      if (token) {
        let userInfo 
        userInfo = await verifyGoogleToken(token);
        if(!userInfo){
          userInfo = await verifyToken(token)
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
        element={user ?<Home/>:<Navigate to="/user" />}
      >
        <Route
          index
          element={
            <>
              <Posts />
            </>
          }
        />
        <Route
          path="edit/:_id"
          element={user ? <Edit /> : <Navigate to="/user" />}
        />
        <Route
          path="/explore"
          element={user ? <Explore /> : <Navigate to="/user" /> }
        />
        <Route
          path="/explore/search"
          element={user ? <Explore /> : <Navigate to="/user" /> }
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
            element= {<div>comming soon...</div>}
          />
        </Route>
      </Route>
      <Route
        path="/user/followers"
        element={user ? <Follower /> : <Navigate to="/user" /> }
      />
      <Route
        path="/user/following"
        element={user ? <Following /> : <Navigate to="/user" /> }
      />
      <Route
        path="/user"
        element={user ? <Navigate to="/" /> : <Unauth />}
      />
      < Route
        path='/post/:_id'
        element={<ViewPost/>}
      />
    </Routes>
  );
}

export default App;