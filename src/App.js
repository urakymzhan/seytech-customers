import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  withRouter,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import NotFound from './components/NotFound';
import Customers from './components/Customers';
import SingleCustomer from './components/SingleCustomer';
import Login from './components/Login';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Cookies from 'js-cookie';

const customers = [
  {
    id: 1,
    name: 'Seytechdata',
    lastName: 'Co',
    avatar: 'https://www.seytech.co/images/logo.png',
    email: 'support@seytech.co',
    state: 'WA',
    phone: 1234567703,
    role: 'student',
    github: 'githubtes',
    courses: ['js, react, algo'],
    payment: 12000,
  },
  {
    id: 2,
    name: 'Eliza',
    lastName: 'Co',
    avatar: 'https://avatars1.githubusercontent.com/u/68719361?s=100&v=4',
    email: 'support@seytech.co',
    state: 'WA',
    phone: 1234567703,
    role: 'student',
    github: 'ewrg',
    courses: ['js, react, algo'],
    payment: 12000,
  },
  {
    id: 3,
    name: 'Adilet',
    lastName: 'Co',
    avatar: 'https://avatars0.githubusercontent.com/u/55602501?s=100&v=4',
    email: 'support@seytech.co',
    state: 'WA',
    phone: 1234567703,
    role: 'instructor',
    github: 'asdsf',
    courses: ['js, react, algo'],
    payment: 12000,
  },
  {
    id: 4,
    name: 'Max',
    lastName: 'Co',
    avatar: 'https://avatars0.githubusercontent.com/u/40704457?s=100&v=4',
    email: 'support@seytech.co',
    state: 'WA',
    phone: 1234567703,
    role: 'student',
    github: 'lkdfg',
    courses: ['js, react, algo'],
    payment: 12000,
  },
  {
    id: 5,
    name: 'Ulan',
    lastName: 'Co',
    avatar: 'https://avatars1.githubusercontent.com/u/16879917?s=100&v=4',
    email: 'support@seytech.co',
    state: 'WA',
    phone: 1234567703,
    role: 'admin',
    github: 'efgdd',
    courses: ['js, react, algo'],
    payment: 12000,
  },
];
// const mainUrl =
//   'https://seytech-customers-backend.herokuapp.com/api/v1/customers';
// const createUrl =
//   'https://seytech-customers-backend.herokuapp.com/api/v1/create';

const getAccessToken = () => Cookies.get('token');
// const getRefreshToken = () => Cookies.get('refresh_token')
const isAuthenticated = () => !!getAccessToken();

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      userInfo: {},
      isLoggedIn: false,
    };
  }

  onLoginSubmit = (customer) => {
    localStorage.setItem('userName', customer.name);
    this.setState({ isLoggedIn: true, userInfo: customer });
  };

  delete = (id) => {
    const customers = this.state.customers.filter((item) => item.id !== id);
    this.setState({ customers });
  };

  logOut = () => {
    Cookies.remove('token');
    localStorage.removeItem('userName');
    // simply needed to rerender
    this.setState({ isLoggedIn: false, userInfo: {} });
  };

  addCustomer = (customer) => {
    const { customers } = this.state;
    customer.id = customers.length + 1;
    customers.unshift(customer);
    this.setState({ customers });
  };

  render() {
    console.log('userInfo', this.state.userInfo);
    return (
      <Container fluid="xl">
        <Router>
          <ul className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {isAuthenticated() && (
              <React.Fragment>
                {/* temporary solution */}
                {/* <li>Welcome {localStorage.getItem('userName')}</li> */}
                <Link to="/login" onClick={this.logOut}>
                  <li>Logout</li>{' '}
                </Link>
              </React.Fragment>
            )}
          </ul>

          <div className="pages">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <Route exact path="/customers">
                {isAuthenticated() ? (
                  <Customers
                    addCustomer={this.addCustomer}
                    delete={this.delete}
                  />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route exact path="/customer/:id">
                <SingleCustomer
                  delete={this.delete}
                  customers={this.state.customers}
                />
              </Route>
              <Route path="/customer/:id/:action">
                <SingleCustomer
                  delete={this.delete}
                  customers={this.state.customers}
                />
              </Route>
              <Route exact path="/login">
                <Login
                  setUser={this.setUser}
                  onLoginSubmit={this.onLoginSubmit}
                />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
