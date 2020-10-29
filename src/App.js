import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      value: 0,
    }
  }

  

  render(){
    return (
      <div>
        <h1> DAta</h1>
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