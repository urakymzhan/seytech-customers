import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import AddCustomer from './AddCustomer';
// import { arrowUp, arrowDown } from '../assets/images';
import { customersUrl } from './api';

const options = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'github', label: 'Github' },
];

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      searchBy: 'name',
      sortBy: null,
      asc: false,
      customers: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(customersUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ customers: data.customers, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message });
      });
  }
  onChange = (e) => {
    this.setState({ value: e.target.value });
    console.log('Search', e.target.value);
  };

  onSelect = (item) => {
    this.setState({ searchBy: item.value });
  };

  sortBy = (sortBy) => {
    const { asc } = this.state;
    this.setState({ asc: !asc, sortBy });
  };

  render() {
    const { customers, isLoading } = this.state;
    const { searchBy, sortBy } = this.state;
    let content;
    if (isLoading) {
      content = <div>Loading...</div>;
    }
    if (customers) {
      content = (
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
                  <Link to={url}>{name}</Link>{' '}
                </td>
                <td>{state}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{payment}</td>
                <td>{courses}</td>
                <td>{role}</td>
                <td>{github} </td>
                <td style={{ width: '250px' }}>
                  <Button className="mr-3" color="primary">
                    <Link className="text-white" to={urlEdit}>
                      Edit
                    </Link>
                  </Button>
                  <Button onClick={() => this.props.delete(_id)} color="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
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
              <th>Actions</th>
            </tr>
          </thead>
          {content}
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
