import React, { Component, useState, useEffect } from 'react';
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

let timer;
const Customers = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [sortBy, setSortBy] = useState(null);
  const [asc, setAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const [customers, setCustomers] = useState([]);
  const [isLoading, seIsLoading] = useState(2);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    seIsLoading(true);
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
        console.log(data);
        setCustomers(data.customers);
        seIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onDelete = (customerId) => {
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
          setCustomers(updatedCustomers);
          setNotification(data.message);
        }
        setTimeout(() => {
          setNotification('');
        }, 2500);
      })
      .catch((err) => {
        setNotification(err.message);
        setTimeout(() => {
          setNotification('');
        }, 2500);
      });
  };

  const addCustomer = (customer) => {
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
          const updatedCustomers = [data.customer, ...customers];
          setCustomers(updatedCustomers);
          setNotification(data.message);
        }
        timer = setTimeout(() => {
          setNotification('');
        }, 2500);
      })
      .catch((err) => {
        setNotification(err.message);
        timer = setTimeout(() => {
          setNotification('');
        }, 2500);
      });
  };

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSelect = (item) => {
    setSearchBy(item.value);
  };

  const onSortBy = (sortByVal) => {
    setAsc(!asc);
    setSortBy(sortByVal);
  };

  const onSort = (data) => {
    let arrowIcon;
    if (sortBy !== null) {
      data.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return asc ? 1 : -1;
        } else if (b[sortBy] > a[sortBy]) {
          return asc ? -1 : 1;
        }
        return 1;
      });
      arrowIcon = asc ? arrowUp : arrowDown;
    }
    return arrowIcon;
  };

  const setPage = (arrow) => {
    const rightLimit = Math.ceil(customers.length / limit);
    if (arrow === 'prev' && currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    } else if (arrow === 'next' && currentPage < rightLimit) {
      setCurrentPage((currentPage) => currentPage + 1);
    } else if (typeof arrow === 'number') {
      setCurrentPage(arrow);
    }
  };

  let customerContent;

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
    const arrowIcon = onSort(filteredCustomers);

    // pagination
    const start = (currentPage - 1) * limit;
    const end = currentPage * limit;
    const paginationData = filteredCustomers.slice(start, end);
    const pageNumbers = customers.filter((d, idx) => !(idx % limit));

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
              <th onClick={() => onSortBy('name')}>
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
              <th onClick={() => onSortBy('createdAt')}>
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
                        onClick={() => onDelete(_id)}
                        color="danger"
                        disabled
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button onClick={() => onDelete(_id)} color="danger">
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
          setPage={setPage}
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
              onChange={onChange}
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
            <Select onChange={onSelect} options={options} />
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
      <AddCustomer addCustomer={addCustomer} />
      {notification && <Alert color="success">{notification}</Alert>}
      {customerContent}
    </div>
  );
};

export default Customers;
