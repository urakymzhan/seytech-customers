import React, { useState, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
// import Cookies from 'js-cookie';
import { removeToken, setToken } from './auth';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Layout from './components/Layout';
const App = () => {
  const [userInfo, setUserInfo] = useState({});

  const logOut = () => {
    // in dev
    setUserInfo({}); // todo
    removeToken();
  };

  const onLoginSubmit = (customer, token) => {
    // in dev
    setToken(customer, token);
    setUserInfo(customer); // todo
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Navbar logOut={logOut} />
        <Layout>
          <Routes onLoginSubmit={onLoginSubmit} />
        </Layout>
      </Router>
    </Suspense>
  );
};

export default App;
