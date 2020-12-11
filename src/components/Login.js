import React, { useState } from 'react';
import { Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { loginUrl } from './api';
const Login = (props) => {
  // needs improvement
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const onChangeEmail = (e) => setEmail(e.target.value);

  const onChangePassword = (e) => setPassword(e.target.value);

  const onSubmit = () => {
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
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setNotification(data.message);
        }
        props.onLoginSubmit(data.customer, data.token);
        props.history.push('/customers');
      })
      .catch((err) => {
        console.log(err);
        // setError
      });
  };

  return (
    <div className="container login-container">
      {notification && <Alert color="danger">{notification}</Alert>}
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          onChange={onChangeEmail}
          type="email"
          name="email"
          value={email}
          placeholder="Email"
        />
      </FormGroup>{' '}
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          onChange={onChangePassword}
          type="password"
          name="password"
          value={password}
          placeholder="Password"
        />
      </FormGroup>{' '}
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
};

export default withRouter(Login);
