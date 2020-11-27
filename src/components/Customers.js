import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import { arrowDown, arrowUp } from '../assets/svg';
import { hide } from 'yargs';

const options = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'github', label: 'Github' },
];

const mainUrl = '/api/v1/customers';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      searchBy: 'name',
      sortBy: null,
      asc: false,
      showAddCustomer: false,
      customers: [],
      isLoading: false,
      error: '',
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(mainUrl)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ customers: data.customers, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message });
      });
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
    const { customers, isLoading } = this.state;
    const { value, searchBy, sortBy, asc } = this.state;

    let content;

    if (isLoading) {
      content = <div>Loading...</div>;
    }
    if (customers) {
      content = (
        <div>
          <div class="user-search-container">
            <div className="search-wrapper">
              <div className="search-select">
                {' '}
                <Select onChange={this.onSelect} options={options} />
              </div>
              <div className="search-input">
                <DebounceInput
                  style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid lightgray',
                    borderRadius: '5px',
                    marginTop: '10px',
                    marginBottom: '10px',
                    padding: '5px',
                  }}
                  minLength={2}
                  onChange={this.onChange}
                  debounceTimeout={300}
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="user-info-wrapper">
              <h3>Welcome {localStorage.getItem('userName')}</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px' }}>
            <em>
              Searching by: <span style={{ color: 'orange' }}>{searchBy}</span>
            </em>
          </p>
          <AddCustomer addCustomer={this.props.addCustomer} />
          <Table className="customers" striped bordered responsive>
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
                <th>Edit </th>
                <th>Delete </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, ind) => {
                const {
                  id,
                  name,
                  lastName,
                  avatar,
                  email,
                  state,
                  phone,
                  role,
                  github,
                  courses,
                  payment,
                } = customer;
                const url = `/customer/${id}`;
                const urlEdit = `/customer/${id}/edit`;
                return (
                  <tr key={id}>
                    <th scope="row">{ind + 1}</th>
                    <td>
                      <img src={avatar} alt="customer avatar" />
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
                    <td>
                      <Button
                        color="success"
                        style={{ padding: '2px 4px', fontSize: '13px' }}
                      >
                        <Link to={urlEdit} style={{ color: '#fff' }}>
                          Edit
                        </Link>
                      </Button>
                    </td>
                    <td>
                      <Button
                        style={{ padding: '2px 4px', fontSize: '13px' }}
                        onClick={() => this.props.delete(id)}
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

    return <div>{content}</div>;
  }
}

export default Customers;
