import React, { Component, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
// import Cookies from 'js-cookie';
import { removeToken, setToken } from './auth';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Layout from './components/Layout';
class App extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
    };
  }
  logOut = () => {
    // in prod
    // Cookies.remove('token');
    // in dev
    this.setState({ customerName: '' }); // todo
    removeToken();
  };

  onLoginSubmit = (customer, token) => {
    // in dev
    setToken(customer, token);
    this.setState({ userInfo: customer }); // todo
  };
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Navbar logOut={this.logOut} />
          <Layout>
            <Routes onLoginSubmit={this.onLoginSubmit} />
          </Layout>
        </Router>
      </Suspense>
    );
  }
}

export default App;
