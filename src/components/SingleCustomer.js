import React, { useState, useEffect } from 'react';
import { Button, Container, Alert } from 'reactstrap';
import { withRouter } from 'react-router';
import { mainUrl } from './api';

let timer;
const SingleCustomer = (props) => {
  const { id } = props.match.params;
  const [editMode, setEditMode] = useState(
    props.match.params.action ? true : false
  );
  const [customer, setCustomer] = useState({});
  const [originalCustomer, setOriginalCustomer] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setIsLoading(true);
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
        setCustomer(customer);
        setOriginalCustomer(customer);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });

    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  const onCustomerDelete = (customerId) => {
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
        props.history.push('/customers');
      })
      .catch((err) => {
        setNotification(err.message);
        timer = setTimeout(() => {
          setNotification('');
        }, 2500);
      });
  };

  const onEdit = () => {
    setEditMode(true);
  };
  const onCancel = () => {
    // put original customer back
    setEditMode(false);
    setCustomer(originalCustomer);
  };
  const onSave = () => {
    setIsLoading(true);
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
        setCustomer(data.customer);
        setOriginalCustomer(data.customer);
        setIsLoading(false);
        setEditMode(false);
        setNotification(data.message);
        timer = setTimeout(() => {
          setNotification('');
        }, 2000);
      })
      .catch((err) => {
        console.log('err', err);
        setNotification(err.message);
      });
  };
  const customerChange = (key, value) => {
    setCustomer((customer) => ({
      ...customer,
      [key]: value,
    }));
  };

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
        onChange={(e) => customerChange('avatar', e.target.value)}
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
        onChange={(e) => customerChange('name', e.target.value)}
        value={customer.name}
      />
    ) : (
      customer.name
    );
    lastContent = editMode ? (
      <input
        onChange={(e) => customerChange('lastName', e.target.value)}
        value={customer.lastName}
      />
    ) : (
      customer.lastName
    );
    emailContent = editMode ? (
      <input
        onChange={(e) => customerChange('email', e.target.value)}
        value={customer.email}
      />
    ) : (
      customer.email
    );
    stateContent = editMode ? (
      <input
        onChange={(e) => customerChange('state', e.target.value)}
        value={customer.state}
      />
    ) : (
      customer.state
    );
    phoneContent = editMode ? (
      <input
        onChange={(e) => customerChange('phone', e.target.value)}
        value={customer.phone}
      />
    ) : (
      customer.phone
    );
    roleContent = editMode ? (
      <input
        onChange={(e) => customerChange('role', e.target.value)}
        value={customer.role}
      />
    ) : (
      customer.role
    );
    githubContent = editMode ? (
      <input
        onChange={(e) => customerChange('github', e.target.value)}
        value={customer.github}
      />
    ) : (
      customer.github
    );
    coursesContent = editMode ? (
      <input
        onChange={(e) => customerChange('courses', e.target.value)}
        value={customer.courses} // this is array
      />
    ) : (
      customer.courses
    );
    paymentContent = editMode ? (
      <input
        onChange={(e) => customerChange('payment', e.target.value)}
        value={customer.payments}
      />
    ) : (
      customer.payments
    );
  }

  const editContent = !editMode && (
    <Button onClick={onEdit} color="primary">
      Edit {customer.name}
    </Button>
  );
  const saveContent = editMode && (
    <Button onClick={onSave} color="primary">
      Save
    </Button>
  );
  const cancelContent = editMode && (
    <Button onClick={onCancel} color="secondary">
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
              onClick={() => onCustomerDelete(customer._id)}
              color="danger"
              disabled
            >
              Delete {customer.name}
            </Button>
          ) : (
            <Button
              onClick={() => onCustomerDelete(customer._id)}
              color="danger"
            >
              Delete {customer.name}
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default withRouter(SingleCustomer);
