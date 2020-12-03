import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Container } from 'reactstrap';

import Customers from './components/Customers';
import SingleCustomer from './components/SingleCustomer';
import Login from './components/Login';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NoMatch from './components/NoMatch';
import { isAuthenticated, removeToken } from './auth';
// import Cookies from 'js-cookie';
import { customersUrl, mainUrl } from './components/api';
import { Alert } from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      customerName: '',
      customers: [],
      isLoading: false,
      error: '',
      notification: '',
      userInfo: {},
    };
  }
  getCustomers = () => {
    this.setState({ isLoading: true });
    fetch(customersUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Server Error!');
        }
      })
      .then((data) => {
        // console.log(data);
        this.setState({ customers: data.customers, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message });
      });
  };
  componentDidMount() {
    this.getCustomers();
  }

  delete = (customerId) => {
    fetch(`${mainUrl}/customer/${customerId}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Server Error!');
        }
      })
      .then((data) => {
        if (data.message) {
          const updatedCustomers = this.state.customers.filter(
            (customer) => customer._id !== customerId
          );
          this.setState({
            notification: data.message,
            customers: updatedCustomers,
          });
        }
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      })
      .catch((err) => {
        this.setState({ notification: err.message });
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      });
  };

  logOut = () => {
    // in production
    // Cookies.remove('token');
    // in development
    this.setState({ customerName: '' });
    removeToken();
    localStorage.removeItem('customerName');
    localStorage.removeItem('customerId');
  };

  addCustomer = (customer) => {
    console.log(customer);
    fetch(`${mainUrl}/create`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Server Error!');
        }
      })
      .then((data) => {
        if (data.customer) {
          const updatedCustomers = [data.customer, ...this.state.customers];

          this.setState({
            notification: data.message,
            customers: updatedCustomers,
          });
        }
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      })
      .catch((err) => {
        this.setState({ notification: err.message });
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      });
  };

  onLoginSubmit = (customer, token) => {
    // only in development
    localStorage.setItem('token', token);
    localStorage.setItem('customerName', customer.name);
    localStorage.setItem('customerId', customer._id);
    // simply rerender
    this.setState({ customerName: customer.name, userInfo: customer });
  };
  render() {
    const {
      customerName,
      customers,
      isLoading,
      error,
      notification,
    } = this.state;
    console.log('customers', customers);

    let customerContent;

    if (isLoading) {
      customerContent = <div>Loading...</div>;
    }

    if (error) {
      customerContent = (
        <Alert color="danger">
          <p>{error}</p>
        </Alert>
      );
    }

    if (customers.length === 0) {
      customerContent = isAuthenticated() ? (
        <Customers
          getCustomers={this.getCustomers}
          addCustomer={this.addCustomer}
          customerName={customerName}
          customers={[]}
        />
      ) : (
        <Redirect to="/login" />
      );
    }
    if (customers.length > 0) {
      customerContent = isAuthenticated() ? (
        <Customers
          getCustomers={this.getCustomers}
          addCustomer={this.addCustomer}
          delete={this.delete}
          customerName={customerName}
          customers={customers}
          notification={notification}
        />
      ) : (
        <Redirect to="/login" />
      );
    }
    return (
      <Container fluid="xl">
        <Router>
          <ul className="menu">
            <li>
              {' '}
              <Link to="/">Home</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/dashboard">Dashboard</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/about">About</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/contact">Contact</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/customers">Customers</Link>{' '}
            </li>
            {isAuthenticated() && (
              <li>
                <Link to="/login" onClick={this.logOut}>
                  Logout
                </Link>
              </li>
            )}
          </ul>

          <div className="pages">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/dashboard">
                {isAuthenticated() ? (
                  <div>WELCOME TO SEYTECH PORTAL</div>
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <Route exact path="/customers">
                {customerContent}
              </Route>
              <Route path="/customer/:id">
                {' '}
                <SingleCustomer delete={this.delete} />
              </Route>
              <Route path="/customer/:id/:action">
                <SingleCustomer delete={this.delete} />
              </Route>
              <Route exact path="/login">
                {isAuthenticated() ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login onLoginSubmit={this.onLoginSubmit} />
                )}
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
