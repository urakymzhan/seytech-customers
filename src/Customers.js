import React, {Component} from 'react';
import { Table } from 'reactstrap';
import Select from 'react-select';
import {Button} from 'reactstrap';
import {DebounceInput} from 'react-debounce-input';
import { Link } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import './App.css';

const options = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'github', label: 'Github' }
]

const arrowUp = (
  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
  </svg>
)
const arrowDown = (
  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
  </svg>
)

class Customers extends Component {

  constructor(){
    super()
    this.state = {
      value: "",
      searchBy: "name",
      sortBy: null,
      asc: false,
      showAddCustomer: false
    }
  }


  increase = () => {
    this.setState({timer: this.state.timer+1})
  }

  onChange = (e) => {
    this.setState({value: e.target.value});
    console.log("Search", e.target.value)
  }

  onSelect = (item) => {
    this.setState({searchBy: item.value})
  }

  sortBy = (sortBy) => {
    const {asc} = this.state
    this.setState({asc:!asc, sortBy})
  }

  render(){
    const {customers} = this.props;
    const {value, searchBy, sortBy, asc} = this.state;
    const filteredC = customers.filter(item=>{
      return item[searchBy].toLowerCase().includes(value.toLowerCase())
    })
    let arrowIcon;
    if(sortBy !== null){
      // sort
      filteredC.sort((a,b)=>{
        if(a.name > b.name){
          return asc ? 1 : -1
        } else if(b.name>a.name){
          return asc ? -1 : 1
        }
        return 1
      })
      // sort icon
      arrowIcon = asc ? arrowUp : arrowDown;
    }

    

    return (
      <div >
          <div class="row">
            <div class="col">
              <DebounceInput
                minLength={2}
                onChange={this.onChange}
                debounceTimeout={300}
            />
            </div>
            <div class="col"> <Select onChange={this.onSelect} options={options} /></div>
          </div>
        
        Searching by: {searchBy}
        
        <Table striped className="customers">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th onClick={()=>this.sortBy('name')}>Name {sortBy==='name' && arrowIcon}</th>
              <th>State</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment</th>
              <th>Courses</th>
              <th onClick={()=>this.sortBy('role')}>Role {sortBy==='role' && arrowIcon}</th>
              <th onClick={()=>this.sortBy('github')}>Github {sortBy==='github' && arrowIcon}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredC.map((customer, ind)=>{
                const { id, name, lastName, avatar, email, state, phone,
                role, github, courses, payment, status } = customer;
                const url = `/customer/${id}`;
                const urlEdit = `/customer/${id}/edit`;
                return (
                <tr>
                  <th scope="row">{ind+1}</th>
                  <td><img src={avatar} /></td>
                  <td> <Link to={url}>{name}</Link> </td>
                  <td>{state}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{payment}</td>
                  <td>{courses}</td>
                  <td>{role}</td>
                  <td>{github} </td>
                  <td style={{width:"250px"}}>
                    <Button className="mr-3" color="primary">
                      <Link className="text-white" to={urlEdit}>Edit</Link>
                    </Button>
                    <Button onClick={()=>this.props.delete(id)} color="danger">Delete</Button>
                  </td>
                </tr>
                )
              })
            }
            
          </tbody>
        </Table>
        <AddCustomer addCustomer={this.props.addCustomer} />
      </div>
    )
  }
}




export default Customers;











































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