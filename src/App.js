import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Container } from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
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
import { customersUrl, mainUrl, createurl } from './components/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      customerName: '',
      isLoading: false,
      customers: [],
      error: '',
      notification: '',
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
          throw new Error('Server error! Please try again later.');
        }
      })
      .then((data) => {
        this.setState({
          customers: data.customers,
          isLoading: false,
        });
        setTimeout(() => {
          this.setState({ error: '' });
        }, 2500);
      })
      .catch((err) => {
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
          throw new Error('Server error! Please try again later.');
        }
      })
      .then((data) => {
        const updatedCustomers = this.state.customers.filter(
          (customer) => customer._id !== customerId
        );
        this.setState({
          notification: data.message,
          customers: updatedCustomers,
        });
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      })
      .catch((err) => this.setState({ notification: err.message }));
  };

  logOut = () => {
    // in production
    // Cookies.remove('token');
    // simply rerender
    this.setState({ customerName: '' });
    // in development
    removeToken();
  };

  addCustomer = (customer) => {
    fetch(createurl, {
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
          throw new Error('Server error! Please try again later.');
        }
      })
      .then((data) => {
        if (!data.customer) {
          throw new Error(data.message);
        }
        const updatedCustomers = [...this.state.customers, data.customer];
        console.log('updatedCustomers', updatedCustomers);
        this.setState({
          notification: data.message,
          customers: updatedCustomers,
        });
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

  onLoginSubmit = (customerName, token) => {
    // only in development
    localStorage.setItem('token', token);
    localStorage.setItem('customerName', customerName);
    // simply rerender
    this.setState({ customerName: customerName });
    this.getCustomers();
  };
  render() {
    const {
      customerName,
      isLoading,
      customers,
      error,
      notification,
    } = this.state;
    console.log('customers', customers);

    let customersContent;
    if (isLoading) {
      customersContent = <div>Loading...</div>;
    }
    if (error) {
      customersContent = (
        <Alert color="danger" fade={true}>
          {error}
        </Alert>
      );
    }
    if (customers.length === 0) {
      customersContent = isAuthenticated() ? (
        <Customers customers={[]} addCustomer={this.addCustomer} />
      ) : (
        <Redirect to="/login" />
      );
    }
    if (customers.length > 0) {
      customersContent = isAuthenticated() ? (
        <Customers
          addCustomer={this.addCustomer}
          delete={this.delete}
          customerName={customerName}
          getCustomers={this.getCustomers}
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
              {customersContent}
            </Route>
            <Route path="/customer/:id">
              <SingleCustomer delete={this.delete} customers={customers} />
            </Route>
            <Route path="/customer/:id/:action">
              <SingleCustomer delete={this.delete} customers={customers} />
            </Route>
            <Route exact path="/login">
              {isAuthenticated() ? (
                <Redirect to="/customers" />
              ) : (
                // <div>Already logged in</div>
                <Login onLoginSubmit={this.onLoginSubmit} />
              )}
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
