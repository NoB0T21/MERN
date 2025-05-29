import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { verifyGoogleToken } from './utils/google.verification';
import { useContext, useEffect, useState } from 'react';
import Edit from './components/pages/Edit';
import Home from './components/pages/Home';
import Posts from './components/Posts/Posts';
import Form from './components/Forms/Form';
import Unauth from './components/Unauth';
import './App.css';
import { DataContext } from './context/DataProvider';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {setUserData} = useContext(DataContext);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userInfo = await verifyGoogleToken(token);
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
        element={user ? <Home/> : <Navigate to="/user" />}
      >
        <Route
          index
          element={
            <>
              <Posts />
              {user ? <Form /> : <Unauth />}
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
    </Routes>
  );
}

export default App;