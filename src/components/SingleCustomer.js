import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import { withRouter } from 'react-router';
import { mainUrl } from './api';
class SingleCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: props.match.params.action ? true : false,
      customer: {},
      originalCustomer: {},
      error: '',
      isLoading: false,
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

  delete = () => {
    this.props.delete(this.state.customer._id);
    this.props.history.push('/customers');
  };

  onEdit = () => {
    this.setState({ editMode: true });
  };
  onCancel = () => {
    // do something
    // put original customer back
    const { originalCustomer } = this.state;
    this.setState({ editMode: false, customer: originalCustomer });
  };
  onSave = () => {
    // do something
    const { customer } = this.state;
    this.setState({ editMode: false, originalCustomer: { ...customer } });
  };
  customerChange = (key, value) => {
    const customer = { ...this.state.customer };
    customer[key] = value;
    this.setState({ customer });
  };

  render() {
    const { editMode, customer, isLoading, error } = this.state;

    console.log('customer', customer);

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
          <>
            <div className="title">Avatar:</div>
            <div className="desc">
              <img
                className="img"
                src={customer.avatar}
                alt="customer avatar"
                style={{ width: '50px' }}
              />
            </div>
          </>
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
          value={customer.payment}
        />
      ) : (
        customer.payment
      );
    }

    const editContent = !editMode && (
      <Button onClick={this.onEdit} color="primary">
        {/* Edit {customer.name} */}
        Edit
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

    // const nameContent = editMode ? (
    //   <input
    //     autoFocus
    //     onChange={(e) => this.customerChange('name', e.target.value)}
    //     value={customer.name}
    //   />
    // ) : (
    //   customer.name
    // );
    // const lastContent = editMode ? (
    //   <input
    //     onChange={(e) => this.customerChange('lastName', e.target.value)}
    //     value={customer.lastName}
    //   />
    // ) : (
    //   customer.lastName
    // );
    // const emailContent = editMode ? (
    //   <input
    //     onChange={(e) => this.customerChange('email', e.target.value)}
    //     value={customer.email}
    //   />
    // ) : (
    //   customer.email
    // );
    // const stateContent = editMode ? (
    //   <input
    //     onChange={(e) => this.customerChange('state', e.target.value)}
    //     value={customer.state}
    //   />
    // ) : (
    //   customer.state
    // );
    // const phoneContent = editMode ? (
    //   <input
    //     onChange={(e) => this.customerChange('phone', e.target.value)}
    //     value={customer.phone}
    //   />
    // ) : (
    //   customer.phone
    // );
    // const roleContent = editMode ? (
    //   <input
    //     onChange={(e) => this.customerChange('role', e.target.value)}
    //     value={customer.role}
    //   />
    // ) : (
    //   customer.role
    // );
    // const githubContent = editMode ? (
    //   <input
    //     onChange={(e) => this.customerChange('github', e.target.value)}
    //     value={customer.github}
    //   />
    // ) : (
    //   customer.github
    // );
    // const coursesContent = editMode ? (
    //   <input
    //     onChange={(e) => this.customerChange('courses', e.target.value)}
    //     value={customer.courses}
    //   />
    // ) : (
    //   customer.courses
    // );
    // const paymentContent = editMode ? (
    //   <input
    //     onChange={(e) => this.customerChange('payment', e.target.value)}
    //     value={customer.payment}
    //   />
    // ) : (
    //   customer.payment
    // );

    return (
      <Container style={{ border: '1px solid' }}>
        <div className="row">
          <div className="title">Id:</div>
          <div className="desc">{customer._id}</div>
        </div>
        <div className="row">
          {/* <div className="title">Avatar:</div>
          <div className="desc">
            <img
              className="img"
              src={customer.avatar}
              alt="customer avatar"
              style={{ width: '50px' }}
            />
          </div> */}
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

          <Button onClick={this.delete} color="danger">
            Delete {this.state.customer.name}
          </Button>
        </div>
      </Container>
    );
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
