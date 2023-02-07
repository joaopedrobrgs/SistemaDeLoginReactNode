import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthPage from './components/AuthPage';
import { AppContext } from './components/AppContext';
import MainPage from './components/MainPage';


function App() {

  const userLogged = useContext(AppContext).userLogged;
  const setUserLogged = useContext(AppContext).setUserLogged;
  const token = useContext(AppContext).token;
  const setToken = useContext(AppContext).setToken;

  useEffect(() => {
    if (token) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  }, [token])

  return (
    <BrowserRouter>
      <div className='container my-3vh'>
        <Routes>
          {
            userLogged ?
              <Route exact path='/*' element={<MainPage></MainPage>} />
              :
              <Route exact path='/*' element={<AuthPage></AuthPage>} />
          }
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
