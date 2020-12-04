import React, { Component } from 'react';
import { Button, Container, Alert } from 'reactstrap';
import { withRouter } from 'react-router';
import { mainUrl } from './api';

let setNotification;
class SingleCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: props.match.params.action ? true : false,
      customer: {},
      originalCustomer: {},
      error: '',
      isLoading: false,
      notification: '',
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    fetch(`${mainUrl}/customer/${id}`, {
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
          throw new Error('Server Error!');
        }
      })
      .then((customer) => {
        this.setState({
          customer: customer,
          originalCustomer: customer,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message });
      });
  }

  componentWillUnmount() {
    clearTimeout(setNotification);
  }

  onCustomerDelete = (customerId) => {
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
          throw new Error('Server Error!');
        }
      })
      .then((data) => {
        console.log('data', data);
        this.props.history.push('/customers');
      })
      .catch((err) => {
        this.setState({ notification: err.message });
        setNotification = setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      });
  };

  onEdit = () => {
    this.setState({ editMode: true });
  };
  onCancel = () => {
    // put original customer back
    const { originalCustomer } = this.state;
    this.setState({ editMode: false, customer: originalCustomer });
  };
  onSave = () => {
    const { customer } = this.state;
    // i need to update from database
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    fetch(`${mainUrl}/customer/${id}`, {
      method: 'PATCH',
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
          throw new Error(res.message);
        }
      })
      .then((data) => {
        console.log('data', data);
        this.setState({
          customer: data.customer,
          originalCustomer: data.customer,
          isLoading: false,
          editMode: false,
          notification: data.message,
        });
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2000);
      })
      .catch((err) => {
        console.log('err', err);
        this.setState({ error: err.message });
      });
  };
  customerChange = (key, value) => {
    const customer = { ...this.state.customer };
    customer[key] = value;
    this.setState({ customer });
  };

  render() {
    const { editMode, customer, isLoading, error, notification } = this.state;

    console.log('props', this.props);
    let avatarContent;
    let nameContent;
    let lastContent;
    let emailContent;
    let stateContent;
    let phoneContent;
    let roleContent;
    let githubContent;
    let coursesContent;
    let paymentContent;

    if (isLoading) {
      avatarContent = <div>Loading...</div>;
      nameContent = <div>Loading...</div>;
      lastContent = <div>Loading...</div>;
      emailContent = <div>Loading...</div>;
      stateContent = <div>Loading...</div>;
      phoneContent = <div>Loading...</div>;
      roleContent = <div>Loading...</div>;
      githubContent = <div>Loading...</div>;
      coursesContent = <div>Loading...</div>;
      paymentContent = <div>Loading...</div>;
    }

    if (error) {
      avatarContent = <div>{error}</div>;
      nameContent = <div>{error}</div>;
      lastContent = <div>{error}</div>;
      emailContent = <div>{error}</div>;
      stateContent = <div>{error}</div>;
      phoneContent = <div>{error}</div>;
      roleContent = <div>{error}</div>;
      githubContent = <div>{error}</div>;
      coursesContent = <div>{error}</div>;
      paymentContent = <div>{error}</div>;
    }

    if (customer.name) {
      avatarContent = editMode ? (
        <input
          onChange={(e) => this.customerChange('avatar', e.target.value)}
          value={customer.avatar}
        />
      ) : (
        (avatarContent = (
          <div className="desc">
            <img
              className="img"
              src={customer.avatar}
              alt="customer avatar"
              style={{ width: '50px' }}
            />
          </div>
        ))
      );
      nameContent = editMode ? (
        <input
          autoFocus
          onChange={(e) => this.customerChange('name', e.target.value)}
          value={customer.name}
        />
      ) : (
        customer.name
      );
      lastContent = editMode ? (
        <input
          onChange={(e) => this.customerChange('lastName', e.target.value)}
          value={customer.lastName}
        />
      ) : (
        customer.lastName
      );
      emailContent = editMode ? (
        <input
          onChange={(e) => this.customerChange('email', e.target.value)}
          value={customer.email}
        />
      ) : (
        customer.email
      );
      stateContent = editMode ? (
        <input
          onChange={(e) => this.customerChange('state', e.target.value)}
          value={customer.state}
        />
      ) : (
        customer.state
      );
      phoneContent = editMode ? (
        <input
          onChange={(e) => this.customerChange('phone', e.target.value)}
          value={customer.phone}
        />
      ) : (
        customer.phone
      );
      roleContent = editMode ? (
        <input
          onChange={(e) => this.customerChange('role', e.target.value)}
          value={customer.role}
        />
      ) : (
        customer.role
      );
      githubContent = editMode ? (
        <input
          onChange={(e) => this.customerChange('github', e.target.value)}
          value={customer.github}
        />
      ) : (
        customer.github
      );
      coursesContent = editMode ? (
        <input
          onChange={(e) => this.customerChange('courses', e.target.value)}
          value={customer.courses} // this is array
        />
      ) : (
        customer.courses
      );
      paymentContent = editMode ? (
        <input
          onChange={(e) => this.customerChange('payment', e.target.value)}
          value={customer.payments}
        />
      ) : (
        customer.payments
      );
    }

    const editContent = !editMode && (
      <Button onClick={this.onEdit} color="primary">
        Edit {customer.name}
      </Button>
    );
    const saveContent = editMode && (
      <Button onClick={this.onSave} color="primary">
        Save
      </Button>
    );
    const cancelContent = editMode && (
      <Button onClick={this.onCancel} color="secondary">
        Cancel
      </Button>
    );

    return (
      <Container className="single-customer-wrapper">
        {notification && <Alert>{notification}</Alert>}
        <div>
          <div className="row">
            <div className="title">Id:</div>
            <div className="desc">{customer._id}</div>
          </div>
          <div className="row">
            <div className="title">Avatar:</div>
            <div className="desc">{avatarContent}</div>
          </div>
          <div className="row">
            <div className="title">Name:</div>
            <div className="desc">{nameContent}</div>
          </div>
          <div className="row">
            <div className="title">LastName:</div>
            <div className="desc">{lastContent}</div>
          </div>
          <div className="row">
            <div className="title">Email:</div>
            <div className="desc">{emailContent}</div>
          </div>
          <div className="row">
            <div className="title">State:</div>
            <div className="desc">{stateContent}</div>
          </div>
          <div className="row">
            <div className="title">Phone:</div>
            <div className="desc">{phoneContent}</div>
          </div>
          <div className="row">
            <div className="title">Role:</div>
            <div className="desc">{roleContent}</div>
          </div>
          <div className="row">
            <div className="title">Github:</div>
            <div className="desc">{githubContent}</div>
          </div>
          <div className="row">
            <div className="title">Courses:</div>
            <div className="desc">{coursesContent}</div>
          </div>
          <div className="row">
            <div className="title">Payment:</div>
            <div className="desc">{paymentContent}</div>
          </div>
          <div className="actions">
            {editContent}
            {saveContent}
            {cancelContent}
            {localStorage.getItem('customerId') === customer._id ? (
              <Button
                onClick={() => this.delete(customer._id)}
                color="danger"
                disabled
              >
                Delete {this.state.customer.name}
              </Button>
            ) : (
              <Button
                onClick={() => this.onCustomerDelete(customer._id)}
                color="danger"
              >
                Delete {this.state.customer.name}
              </Button>
            )}
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(SingleCustomer);
