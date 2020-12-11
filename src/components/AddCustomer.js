import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Col,
  FormText,
} from 'reactstrap';

const emptyCustomer = {
  name: '',
  lastName: '',
  avatar: '',
  email: '',
  password: '',
  state: '',
  phone: '',
  role: 'student',
  github: '',
  courses: [],
  payments: 0,
  repl: '',
};

const AddCustomer = (props) => {
  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [isValid, setIsValid] = useState(false);

  const toggle = () => setModal(!modal);

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === 'courses') {
      const courses = value.split(',');
      customer[id] = courses;
    }
    setCustomer((customer) => ({
      ...customer,
      [id]: value,
    }));
  };

  const add = (e) => {
    e.preventDefault();
    const { name, lastName, email, password } = customer;
    if (name === '' || lastName === '' || email === '' || password === '') {
      setIsValid(true);
      setModal(true);
    } else {
      props.addCustomer(customer);
      toggle();
      // reset customer
      const resetCustomer = { ...emptyCustomer };
      setCustomer(resetCustomer);
    }
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Add new customer
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add new customer</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name. ex: John ... "
                />
                {isValid ? (
                  <FormText color="danger">
                    This field can not be empty!
                  </FormText>
                ) : (
                  ''
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="LastName. ex: Doe ... "
                />
                {isValid ? (
                  <FormText color="danger">
                    This field can not be empty!
                  </FormText>
                ) : (
                  ''
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.avatar}
                  type="text"
                  name="avatar"
                  id="avatar"
                  placeholder="Avatar url. ex: https://myavatars.com/me.jpg ..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email. ex: john@doe.com ... "
                />
                {isValid ? (
                  <FormText color="danger">
                    This field can not be empty!
                  </FormText>
                ) : (
                  ''
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password. Min 4 charachters"
                />
                {isValid ? (
                  <FormText color="danger">
                    This field can not be empty!
                  </FormText>
                ) : (
                  ''
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.state}
                  type="text"
                  name="state"
                  id="state"
                  placeholder="State. ex: CA, WA ..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.phone}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="123 456 6789"
                />
              </Col>
            </FormGroup>
            <FormGroup tag="fieldset" row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  type="select"
                  name="role"
                  id="role"
                  value={customer.role}
                  placeholder="Role"
                >
                  <option value="">-- Select role --</option>
                  <option value="customer">Customer</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.github}
                  type="text"
                  name="github"
                  id="github"
                  placeholder="Github. ex: https://github.com/johndoe ..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.courses}
                  type="text"
                  name="courses"
                  id="courses"
                  placeholder="Courses. ex: React, JS, CSS, ..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              {/* <Label for="payments" sm={2}>
                  Payments
                </Label> */}
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.payments}
                  type="number"
                  name="payments"
                  id="payments"
                  placeholder="Payments"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onChange}
                  value={customer.repl}
                  type="text"
                  name="repl"
                  id="repl"
                  placeholder="Repl. ex: https://repl.it/johndoe ..."
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={add}>
            Add
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddCustomer;
