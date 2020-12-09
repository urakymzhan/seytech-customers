import React, { Component } from 'react';
import { Table, Alert } from 'reactstrap';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import { arrowUp, arrowDown } from '../assets/images';
import Pagination from '../components/Pagination';
import { customersUrl, mainUrl } from './api';

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

      currentPage: 1,
      limit: 2,

      customers: [],
      isLoading: false,
      error: '',
      notification: '',
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Server Error!');
        }
      })
      .then((data) => {
        // console.log(data);
        this.setState({ customers: data.customers, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message });
      });
  }
  // todo: rename this function
  delete = (customerId) => {
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
        if (data.message) {
          const updatedCustomers = this.state.customers.filter(
            (customer) => customer._id !== customerId
          );
          this.setState({
            notification: data.message,
            customers: updatedCustomers,
          });
        }
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      })
      .catch((err) => {
        this.setState({ notification: err.message });
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      });
  };

  addCustomer = (customer) => {
    console.log(customer);
    fetch(`${mainUrl}/create`, {
      method: 'post',
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
          throw new Error('Server Error!');
        }
      })
      .then((data) => {
        if (data.customer) {
          const updatedCustomers = [data.customer, ...this.state.customers];

          this.setState({
            notification: data.message,
            customers: updatedCustomers,
          });
        }
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      })
      .catch((err) => {
        this.setState({ notification: err.message });
        setTimeout(() => {
          this.setState({ notification: '' });
        }, 2500);
      });
  };

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

  sort = (data, arrowIcon) => {
    const { sortBy, asc } = this.state;

    if (sortBy !== null) {
      data.sort((a, b) => {
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

  setPage = (arrow) => {
    const { customers, currentPage, limit } = this.state;

    const rightLimit = Math.ceil(customers.length / limit);

    if (arrow === 'prev' && currentPage > 1) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1,
        // paginationData: paginationData,
      }));
    } else if (arrow === 'next' && currentPage < rightLimit) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1,
        // paginationData: paginationData,
      }));
    } else if (typeof arrow === 'number') {
      this.setState({ currentPage: arrow });
    }
  };

  render() {
    const { searchBy, sortBy, searchValue, limit, currentPage } = this.state;
    const { isLoading, error, customers, notification } = this.state;

    let customerContent; // todo

    if (isLoading) {
      customerContent = <div style={{ margin: '20px' }}>Loading...</div>;
    }

    if (error) {
      customerContent = (
        <Alert color="danger">
          <p>{error}</p>
        </Alert>
      );
    }

    if (customers && customers.length > 0) {
      // search from all customers
      const filteredCustomers = customers.filter((item) => {
        return item[searchBy].toLowerCase().includes(searchValue.toLowerCase());
      });
      // sort all customers
      let arrowIcon;
      this.sort(filteredCustomers, arrowIcon);

      // pagination
      const start = (currentPage - 1) * limit;
      const end = currentPage * limit;
      const paginationData = filteredCustomers.slice(start, end);
      const pageNumbers = customers.filter((d, idx) => !(idx % limit)); // modulus => !falsy = true

      console.log('pageNumbers', pageNumbers);
      //  0, 1, 2, 3 => 0 % 2 = 0(false), 1 % 2 = 1(true) , 2 % 2 = 0(false), 3 % 2 = 1(true)

      customerContent = (
        <React.Fragment>
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
              {paginationData.map((customer, ind) => {
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
                const singleCustomerUrl = `/customer/${_id}`;
                const singleCustomerEditUrl = `/customer/${_id}/edit`;
                return (
                  <tr key={_id}>
                    <td>{ind + 1}</td>
                    <td>
                      <img src={avatar} alt="customers avatars" />
                    </td>
                    <td>
                      {' '}
                      <Link
                        to={{
                          pathname: singleCustomerUrl,
                        }}
                      >
                        {name}
                      </Link>{' '}
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

                    <td>{createdAt}</td>
                    <td>
                      <Button color="primary">
                        <Link className="text-white" to={singleCustomerEditUrl}>
                          Edit
                        </Link>
                      </Button>
                    </td>
                    <td>
                      {localStorage.getItem('customerId') === _id ? (
                        <Button
                          onClick={() => this.props.delete(_id)}
                          color="danger"
                          disabled
                        >
                          Delete
                        </Button>
                      ) : (
                        <Button
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

          <Pagination
            setPage={this.setPage}
            pageNumbers={pageNumbers}
            currentPage={currentPage}
          />
        </React.Fragment>
      );
    }

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
            <h1>Welcome {localStorage.getItem('customerName')}</h1>
          </div>
        </div>
        <p>
          <em>
            Searching by: <span style={{ color: 'orange' }}>{searchBy}</span>
          </em>
        </p>
        <AddCustomer addCustomer={this.addCustomer} />
        {notification && <Alert color="success">{notification}</Alert>}
        {customerContent}
      </div>
    );
  }
}

export default Customers;
