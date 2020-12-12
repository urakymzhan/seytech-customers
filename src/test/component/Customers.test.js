import React from 'react';
import Customers from '../../components/Customers';
import AddCustomer from '../../components/AddCustomer';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Customers> component tests', () => {
  it('renders <App> component correctly', () => {
    shallow(<Customers />);
  });

  test('snapshot renders', () => {
    const component = renderer.create(<Customers />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot(); // https://jestjs.io/docs/en/snapshot-testing
  });

  it('renders <AddCustomer> component', () => {
    const wrapper = shallow(<Customers />);
    expect(wrapper.find(AddCustomer).length).toEqual(1);
  });

  // ask them to add more tests...

  it('Customers should have input with className search-select', () => {
    let app = mount(<Customers />);
    expect(app.find('.search-select').exists()).toEqual(true);
  });
  it('Customers should have input with className search-input', () => {
    let app = mount(<Customers />);
    expect(app.find('.search-input').exists()).toEqual(true);
  });
});
