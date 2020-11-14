import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Button } from "reactstrap";

import Customers from './Customers';
import SingleCustomer from './SingleCustomer';
import Login from './Login';
import './App.css';

const customers = [
  {
    id: 1, name: "Seytechdata", lastName: "Co", avatar: "https://www.seytech.co/images/logo.png",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "student", github: "githubtes", courses: ["js, react, algo"],
    payment: 12000
  },
  {
    id: 2, name: "Eliza", lastName: "Co", avatar: "https://avatars1.githubusercontent.com/u/68719361?s=100&v=4",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "student", github: "ewrg", courses: ["js, react, algo"],
    payment: 12000
  },
  {
    id: 3, name: "Adilet", lastName: "Co", avatar: "https://avatars0.githubusercontent.com/u/55602501?s=100&v=4",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "instructor", github: "asdsf", courses: ["js, react, algo"],
    payment: 12000
  },
  {
    id: 4, name: "Max", lastName: "Co", avatar: "https://avatars0.githubusercontent.com/u/40704457?s=100&v=4",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "student", github: "lkdfg", courses: ["js, react, algo"],
    payment: 12000
  },
  {
    id: 5, name: "Ulan", lastName: "Co", avatar: "https://avatars1.githubusercontent.com/u/16879917?s=100&v=4",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "admin", github: "efgdd", courses: ["js, react, algo"],
    payment: 12000
  },
]

class App extends Component {

  constructor(){
    super();
    this.state = {
      customers,
      userInfo:{},
      isLoggedIn: false
    }
  }

  componentDidMount(){
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if(userInfo){
      this.setState({userInfo, isLoggedIn:true})
      this.props.history.push('/customers')
    }
  }

  delete = (id) => {
    //filter
    const customers = this.state.customers.filter(item=>item.id !== id)
    this.setState({customers})
  }

  setUser = (userInfo) => this.setState({userInfo, isLoggedIn:true})

  logOut = () => {
    this.setState({userInfo:{}, isLoggedIn:false})
    localStorage.removeItem('user')
  }

  addCustomer = (customer) => {
    debugger
    const {customers} = this.state;
    customer.id = customers.length + 1;
    customers.unshift(customer)
    this.setState({customers})
    console.log(this.state.customers)
  }

  render(){
    const {isLoggedIn, userInfo} = this.state;
    return (
      <div className="container">
          <ul className="menu">
    {/*         <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/about">About</Link> </li>
            <li> <Link to="/contact">Contact</Link> </li>
            <li> <Link to="/customers">Customers</Link> </li> */}
            {isLoggedIn && <Button className="" color="primary">Welcome {userInfo.name}</Button>}
            {isLoggedIn && <Link to="/login" onClick={this.logOut}><Button className="float-right mr-5" color="secondary">Logout</Button> </Link>}
          </ul>

          

          <div className="pages">
            <Switch>
              <Route path="/" exact>
                <div className="page">Home Page</div>
              </Route>
              <Route path="/about">
                <div className="page">About Page</div>
              </Route>
              <Route path="/contact">
                <div className="page">Contact Page</div>
              </Route>
              <Route path="/customers">
                {!isLoggedIn ? <Redirect to="/login" /> : <Customers addCustomer={this.addCustomer} delete={this.delete} customers={this.state.customers} /> }
                
              </Route>
              <Route exact path="/customer/:id">
                <SingleCustomer delete={this.delete} customers={this.state.customers} />
              </Route>
              <Route path="/customer/:id/:action">
                <SingleCustomer delete={this.delete} customers={this.state.customers} />
              </Route>
              <Route path="/login">
                <Login setUser={this.setUser} />
              </Route>
            </Switch>
          </div>
        </div>
    )
  }
}




export default withRouter(App);





{/* <div className="container">
          <h1> Seytech Customers</h1>
          <Customers customers={this.state.customers} />
        </div>
 */}




































/*
const data = [
  {countryName: "USA", currency:"dollar", products:[
    {name: "apple", active:true, subProducts:[
      {name: "iPhone", price: 40, sold:4},
      {name: "iPad", price: 530, sold:4},
      {name: "watch", price: 530},
    ]}
  ]},
  {countryName: "Russia", currency:"rubl", products:[
    {name: "apple", active:true, subProducts:[
      {name: "iPhone", price: 40, sold:4},
      {name: "iPad", price: 530, sold:4},
      {name: "watch", price: 530},
    ]}
  ]}
]
*/