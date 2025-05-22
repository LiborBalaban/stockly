import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useData from '../hooks/loadData';
import { useUser } from '../context/UserContext';

const ProtectedRoute = () => {
  const { data, loading, error } = useData('http://localhost:5000/auth');
  const [auth, setAuth] = useState(null); // Začínáme s `null` pro neznámý stav
  const { loginUser } = useUser();

  useEffect(() => {
    if (!loading) {
      if (data && data.message === 'You are authenticated') {
        loginUser(data);
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className='loadingPage flex'>
        <div className='loading'></div>
      </div>
    );
  }

  if (auth === null) {
    // Pokud je stav neznámý, počkáme na vyhodnocení
    return (
      <div className='loadingPage flex'>
        <div className='loading'></div>
      </div>
    );
  }

  if (error) {
    console.error('Error:', error);
    return <Navigate to="/login" />;
  }

 return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
