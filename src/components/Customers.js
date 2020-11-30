import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import Alert from 'reactstrap/lib/Alert';

const options = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'github', label: 'Github' },
];

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchBy: 'name',
      sortBy: null,
      asc: false,
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSelect = (item) => {
    this.setState({ searchBy: item.value });
  };

  sortBy = (sortBy) => {
    const { asc } = this.state;
    this.setState({ asc: !asc, sortBy });
  };

  render() {
    const { customers, notification } = this.props;
    const { searchBy, sortBy } = this.state;

    return (
      <div className="customers-wrapper">
        <div style={{ display: 'flex' }}>
          <div className="search-wrapper">
            <div className="search-input">
              <DebounceInput
                minLength={2}
                onChange={this.onChange}
                debounceTimeout={300}
                style={{
                  height: '100%',
                  width: '100%',
                  padding: '10px',
                  border: '1px solid lightgray',
                  borderRadius: '5px',
                }}
                placeholder="Search..."
              />
            </div>
            <div className="search-select">
              {' '}
              <Select onChange={this.onSelect} options={options} />
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1>{localStorage.getItem('customerName')}</h1>
          </div>
        </div>
        <p>
          <em>
            Searching by: <span style={{ color: 'orange' }}>{searchBy}</span>
          </em>
        </p>
        <AddCustomer addCustomer={this.props.addCustomer} />
        {notification && <Alert color="danger">{notification}</Alert>}

        <Table
          striped
          bordered
          responsive
          className="customers"
          style={{ marginTop: '10px' }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th onClick={() => this.sortBy('name')}>
                Name {sortBy === 'name'}
              </th>
              <th>State</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment</th>
              <th>Courses</th>
              <th onClick={() => this.sortBy('role')}>
                Role {sortBy === 'role'}
              </th>
              <th onClick={() => this.sortBy('github')}>
                Github {sortBy === 'github'}
              </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, ind) => {
              const {
                _id,
                name,
                // lastName,
                avatar,
                email,
                state,
                phone,
                role,
                github,
                courses,
                payment,
              } = customer;
              const url = `/customer/${_id}`;
              const urlEdit = `/customer/${_id}/edit`;
              return (
                <tr key={_id}>
                  <th scope="row">{ind + 1}</th>
                  <td>
                    <img src={avatar} alt="customers avatars" />
                  </td>
                  <td>
                    {' '}
                    <Link to={{ pathname: url, state: { customer: customer } }}>
                      {name}
                    </Link>{' '}
                  </td>
                  <td>{state}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{payment}</td>
                  <td>{courses}</td>
                  <td>{role}</td>
                  <td>{github} </td>
                  <td>
                    <Button color="primary">
                      <Link className="text-white" to={urlEdit}>
                        Edit
                      </Link>
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => this.props.delete(_id)}
                      color="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Customers;

// const filteredC = customers.filter((item) => {
//   return item[searchBy].toLowerCase().includes(value.toLowerCase());
// });
// let arrowIcon;
// if (sortBy !== null) {
//   // sort
//   filteredC.sort((a, b) => {
//     if (a.name > b.name) {
//       return asc ? 1 : -1;
//     } else if (b.name > a.name) {
//       return asc ? -1 : 1;
//     }
//     return 1;
//   });
//   // sort icon
//   arrowIcon = asc ? arrowUp : arrowDown;
// }
