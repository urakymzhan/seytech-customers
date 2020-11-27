import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
const loginUrl = '/api/v1/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: {
      //   username: 'seytech',
      //   password: 'seytech',
      //   name: 'Marat Gaipov',
      // },
      email: '',
      password: '',
    };
  }

  onChangeEmail = (e) => this.setState({ email: e.target.value });

  onChangePassword = (e) => this.setState({ password: e.target.value });

  onSubmit = () => {
    const { email, password } = this.state;
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.onLoginSubmit(data.customer);
        this.props.history.push('/customers');
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-container">
        <FormGroup>
          <Label for="username">Email</Label>
          <Input
            onChange={this.onChangeEmail}
            type="email"
            name="email"
            value={email}
            placeholder="Email"
          />
        </FormGroup>{' '}
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            onChange={this.onChangePassword}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
          />
        </FormGroup>{' '}
        <Button onClick={this.onSubmit}>Submit</Button>
      </div>
    );
  }
}

export default withRouter(Login);
