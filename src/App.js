import React, {Component} from 'react';
import Customers from './Customers';
import './App.css';

const customers = [
  {
    id: 1, name: "Seytech", lastName: "Co", avatar: "https://www.seytech.co/images/logo.png",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "student", github: "seytechschool", courses: ["js, react, algo"],
    payment: 12000
  },
  {
    id: 2, name: "Eliza", lastName: "Co", avatar: "https://avatars1.githubusercontent.com/u/68719361?s=100&v=4",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "student", github: "seytechschool", courses: ["js, react, algo"],
    payment: 12000
  },
  {
    id: 3, name: "Adilet", lastName: "Co", avatar: "https://avatars0.githubusercontent.com/u/55602501?s=100&v=4",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "instructor", github: "seytechschool", courses: ["js, react, algo"],
    payment: 12000
  },
  {
    id: 4, name: "Max", lastName: "Co", avatar: "https://avatars0.githubusercontent.com/u/40704457?s=100&v=4",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "student", github: "seytechschool", courses: ["js, react, algo"],
    payment: 12000
  },
  {
    id: 5, name: "Ulan", lastName: "Co", avatar: "https://avatars1.githubusercontent.com/u/16879917?s=100&v=4",
    email: "support@seytech.co", state: "WA", phone: 1234567703,
    role: "admin", github: "seytechschool", courses: ["js, react, algo"],
    payment: 12000
  },
]

class App extends Component {

  constructor(){
    super();
    this.state = {
      customers,
    }
  }

  

  render(){
    return (
      <div className="container">
        <h1> Seytech Customers</h1>
        <Customers customers={this.state.customers} />
      </div>
    )
  }
}




export default App;











































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