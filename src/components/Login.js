import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { loginUrl } from './api';
import Alert from 'reactstrap/lib/Alert';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      email: '',
      password: '',
      notification: '',
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
      body: JSON.stringify({
        email: email,
        password: password,
      }),
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
          this.setState({ notification: data.message });
          return;
        }
        this.setState({ userInfo: data.customer });
        this.props.onLoginSubmit(data.customer.name, data.token);
        this.props.history.push('/customers');
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message });
      });
  };

  render() {
    const { name, password, notification } = this.state;
    return (
      <div className="container login-container">
        <FormGroup>
          {notification && <Alert>{notification}</Alert>}
          <Label for="email" hidden>
            Email
          </Label>
          <Input
            onChange={this.onChangeEmail}
            type="email"
            name="email"
            value={name}
            placeholder="Email"
          />
        </FormGroup>{' '}
        <FormGroup>
          <Label for="password" hidden>
            Password
          </Label>
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
