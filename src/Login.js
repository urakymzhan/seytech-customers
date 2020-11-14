import React, {Component} from 'react';
import { Button,FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class Login extends Component {

  constructor(){
    super()
    this.state = {
      userInfo: {username:'seytech', password: 'seytech', name: 'Marat Gaipov'},
      username:'',
      password:'',
    }
  }

  onChangeEmail = e => this.setState({username: e.target.value})
  
  onChangePassword = e => this.setState({password: e.target.value})

  onSubmit = () => {
    const {username, password, userInfo} = this.state;
    if(userInfo.username === username && userInfo.password === password){
      localStorage.setItem("user", JSON.stringify(userInfo))
      this.props.setUser(userInfo)
      // redirect to /customers
      this.props.history.push('/customers')
    } else {
      console.log('error')
    }

  }


  render(){
    const {name, password} = this.state;
    return (
      <div className="container">
        <FormGroup>
          <Label for="username" hidden>Username</Label>
          <Input onChange={this.onChangeEmail} type="email" name="username" value={name} placeholder="Email" />
        </FormGroup>
        {' '}
        <FormGroup>
          <Label for="password" hidden>Password</Label>
          <Input onChange={this.onChangePassword}  type="password" name="password" value={password} placeholder="Password" />
        </FormGroup>
        {' '}
        <Button onClick={this.onSubmit}>Submit</Button>
    </div>
    )
  }
}




export default withRouter(Login);











































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