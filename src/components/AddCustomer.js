import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap';

const emptyCustomer = {
  name: '',
  lastName: '',
  avatar: '',
  email: '',
  state: '',
  phone: '',
  courses: '',
  role: 'student',
  github: '',
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
      state,
      phone,
      courses,
      role,
      github,
    } = this.state.customer;
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Add New Customer
        </Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add new customer</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="name" sm={2}>
                  Name
                </Label>
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
                <Label for="lastName" sm={2}>
                  Lastname
                </Label>
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
                <Label for="avatar" sm={2}>
                  Avatar
                </Label>
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
                <Label for="email" sm={2}>
                  Email
                </Label>
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
                <Label for="state" sm={2}>
                  State
                </Label>
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
                <Label for="phone" sm={2}>
                  Phone
                </Label>
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
              <FormGroup row>
                <Label for="courses" sm={2}>
                  Courses
                </Label>
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
              <FormGroup tag="fieldset" row>
                <Label for="customer" sm={2}>
                  Role
                </Label>
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
                <Label for="github" sm={2}>
                  Github
                </Label>
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

/*
const data = [
  {countryName: "USA", currency:"dollar", products:[
    {name: "apple", active:true, subProducts:[
      {name: "iPhone", price: 40, sold:4},
      {name: "iPad", price: 530, sold:4},
      {name: "watch", price: 530},
    ]}
  ]},
  {countryName: "Russia", currency:"rubl", products:[
    {name: "apple", active:true, subProducts:[
      {name: "iPhone", price: 40, sold:4},
      {name: "iPad", price: 530, sold:4},
      {name: "watch", price: 530},
    ]}
  ]}
]
*/
