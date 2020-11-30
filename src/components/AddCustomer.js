import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  // Label,
  Input,
  Col,
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

class AddCustomer extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      customer: emptyCustomer,
    };
  }
  toggle = () => this.setState({ modal: !this.state.modal });

  onChange = (e) => {
    const { customer } = this.state;
    const { id, value } = e.target;
    customer[id] = value;
    if (id === 'courses') {
      const courses = value.split(',');
      customer[id] = courses;
    }
    this.setState({ customer });
  };

  add = () => {
    this.props.addCustomer(this.state.customer);
    this.toggle();
    // reset customer
    const customer = { ...emptyCustomer };
    this.setState({ customer });
  };

  render() {
    const { modal } = this.state;
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
                    placeholder="Name"
                  />
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
                    placeholder="Lastname"
                  />
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
                    placeholder="Avatar"
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
                    placeholder="Email"
                  />
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
                    placeholder="Password"
                  />
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
                    placeholder="State"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    onChange={this.onChange}
                    value={phone}
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                  />
                </Col>
              </FormGroup>
              <FormGroup tag="fieldset" row>
                <Col sm={10}>
                  <FormGroup check>
                    <Input
                      onChange={this.onChange}
                      type="select"
                      name="role"
                      id="role"
                      value={role}
                    >
                      <option value="customer">Customer</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </Input>
                  </FormGroup>
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
                    placeholder="Github"
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
                    placeholder="Courses"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
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
                    placeholder="Repl"
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
