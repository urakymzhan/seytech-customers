import React, { Component } from 'react';
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
  phone: 'Phone. ex: 312 434 4343',
  role: 'student',
  github: '',
  courses: [],
  payments: 12000,
  repl: '',
};

class AddCustomer extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      customer: emptyCustomer,
      isValid: false,
    };
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  onChange = (e) => {
    const { customer } = this.state;
    const { id, value } = e.target;
    customer[id] = value;
    if (id === 'courses') {
      const courses = value.split(',');
      customer[id] = courses; // courses['courses'] = ['JS', 'React', ...]
    }
    this.setState({ customer });
  };

  add = () => {
    const { name, lastName, email, password } = this.state.customer;
    if (name === '' || lastName === '' || email === '' || password === '') {
      this.setState({ isValid: true, modal: true });
    } else {
      this.props.addCustomer(this.state.customer);
      this.toggle();
      // reset customer
      const customer = { ...emptyCustomer };
      this.setState({ customer });
    }
  };

  render() {
    const { modal, isValid } = this.state;
    const {
      name,
      lastName,
      avatar,
      email,
      password,
      state,
      phone,
      role,
      github,
      courses,
      payments,
      repl,
    } = this.state.customer;
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Add new customer
        </Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add new customer</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    onChange={this.onChange}
                    value={name}
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
                    onChange={this.onChange}
                    value={lastName}
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
                    onChange={this.onChange}
                    value={avatar}
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
                    onChange={this.onChange}
                    value={email}
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
                    onChange={this.onChange}
                    value={password}
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
                    onChange={this.onChange}
                    value={state}
                    type="text"
                    name="state"
                    id="state"
                    placeholder="State. ex: CA, WA ..."
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                {/* <Label for="phone" sm={2}>
                  Phone
                </Label> */}
                <Col sm={10}>
                  <Input
                    onChange={this.onChange}
                    value={phone}
                    type="tel"
                    name="phone"
                    id="phone"
                  />
                </Col>
              </FormGroup>
              <FormGroup tag="fieldset" row>
                <Col sm={10}>
                  <Input
                    onChange={this.onChange}
                    type="select"
                    name="role"
                    id="role"
                    value={role}
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
                    onChange={this.onChange}
                    value={github}
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
                    onChange={this.onChange}
                    value={courses}
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
                    onChange={this.onChange}
                    value={payments}
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
                    onChange={this.onChange}
                    value={repl}
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
            <Button color="primary" onClick={this.add}>
              Add
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddCustomer;
