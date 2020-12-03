import React, { Component } from 'react';
import { Table, Alert } from 'reactstrap';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import { arrowUp, arrowDown } from '../assets/images';

const options = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'github', label: 'Github' },
];

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      searchBy: 'name',
      sortBy: null,
      asc: false,
    };
  }

  componentDidMount() {
    this.props.getCustomers();
  }
  onChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  onSelect = (item) => {
    this.setState({ searchBy: item.value });
  };

  sortBy = (sortBy) => {
    const { asc } = this.state;
    this.setState({ asc: !asc, sortBy });
  };

  sort = (filteredCustomers, arrowIcon) => {
    const { sortBy, asc } = this.state;

    if (sortBy !== null) {
      filteredCustomers.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return asc ? 1 : -1;
        } else if (b[sortBy] > a[sortBy]) {
          return asc ? -1 : 1;
        }
        return 1;
      });
      // sort icon
      arrowIcon = asc ? arrowUp : arrowDown;
    }
  };
  render() {
    const { customers, notification } = this.props;
    const { searchBy, sortBy, searchValue, asc } = this.state;
    // search
    const filteredCustomers = customers.filter((item) => {
      return item[searchBy].toLowerCase().includes(searchValue.toLowerCase());
    });
    // sort
    let arrowIcon;
    this.sort(filteredCustomers, arrowIcon);

    return (
      <div className="customers-wrapper">
        <div style={{ display: 'flex' }}>
          <div className="search-wrapper">
            <div className="search-input">
              <DebounceInput
                minLength={0}
                onChange={this.onChange}
                debounceTimeout={300}
                style={{
                  height: '100%',
                  width: '100%',
                  padding: '10px',
                  border: '1px solid lightgray',
                  borderRadius: '5px',
                }}
                placeholder="Search customers ..."
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
        {notification && <Alert color="success">{notification}</Alert>}
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
                Name {sortBy === 'name' && arrowIcon}
              </th>
              <th>Last Name</th>
              <th>State</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment</th>
              <th>Courses</th>
              <th>Role</th>
              <th>Github</th>
              <th onClick={() => this.sortBy('createdAt')}>
                CreatedAt {sortBy === 'createdAt' && arrowIcon}
              </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, ind) => {
              const {
                _id,
                name,
                lastName,
                avatar,
                email,
                state,
                phone,
                role,
                github,
                courses,
                payments,
                createdAt,
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
                  <td>{lastName}</td>
                  {state ? <td>{state}</td> : <td>N/A</td>}
                  <td>{email}</td>
                  {phone ? <td>{phone}</td> : <td>N/A</td>}

                  {payments ? <td>{payments}</td> : <td>N/A</td>}

                  {courses ? <td>{courses}</td> : <td>N/A</td>}

                  {/* todo */}
                  {role ? <td>{role}</td> : <td>Not Assigned</td>}

                  {github ? <td>{github}</td> : <td>N/A</td>}

                  {createdAt}
                  <td>
                    <Button color="primary">
                      <Link className="text-white" to={urlEdit}>
                        Edit
                      </Link>
                    </Button>
                  </td>
                  <td>
                    {localStorage.getItem('customerId') === _id ? (
                      <Button
                        color="primary"
                        onClick={() => this.props.delete(_id)}
                        color="danger"
                        disabled
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        onClick={() => this.props.delete(_id)}
                        color="danger"
                      >
                        Delete
                      </Button>
                    )}
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
