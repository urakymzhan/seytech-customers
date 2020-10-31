import React, {Component} from 'react';
import { withRouter } from "react-router";

import './App.css';

class SingleCustomer extends Component {

  render(){
    const { id } = this.props.match.params; 
    const customer = this.props.customers.find(item=>item.id === Number(id));
    return (
      <div>
      {
          Object.keys(customer).map(key=>{
            return (
              <div key={key} className="row">
                <div className="title">{key}:</div>
                <div className="desc">{ customer[key] }</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}


export default withRouter(SingleCustomer);











































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