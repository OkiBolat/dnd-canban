import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Canban from './pages/Canban/Canban';
import Login from './pages/Login/Login';
import { logIn } from './store/auth/actionCreators';
import styles from './App.module.css'

const App = () => {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token && !isAuthorized) {
      dispatch(logIn());
    }
  }, [dispatch, token, isAuthorized]);

  return <div className={styles.container}>
    <Routes>
      <Route path="/" exact element={<Canban />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </div>
}

export default App;
