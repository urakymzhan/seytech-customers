import React from 'react';
import AddCustomer from '../../components/AddCustomer';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Customers> component tests', () => {
  it('renders <Dashboard> component correctly', () => {
    mount(<AddCustomer />);
  });
  test('snapshot renders', () => {
    const component = renderer.create(<AddCustomer />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot(); // https://jestjs.io/docs/en/snapshot-testing
  });

  it('Dashboard should have h1 text correctly', () => {
    let app = mount(<AddCustomer />);
    app.find('button').at(0).simulate('click');
    const modalElement = app.find('.modal-content');
    expect(modalElement).toBeTruthy();
  });
});
