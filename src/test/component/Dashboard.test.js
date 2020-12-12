import React from 'react';
import Dashboard from '../../components/Dashboard';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Customers> component tests', () => {
  it('renders <Dashboard> component correctly', () => {
    shallow(<Dashboard />);
  });

  test('snapshot renders', () => {
    const component = renderer.create(<Dashboard />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot(); // https://jestjs.io/docs/en/snapshot-testing
  });

  it('Dashboard should have h1 text correctly', () => {
    let app = shallow(<Dashboard />);
    expect(app.find('h1').text()).toEqual('WELCOME TO SEYTECH PORTAL');
  });

  it('Dashboard should have h3 at 0 with Profile text', () => {
    let app = shallow(<Dashboard />);
    expect(app.find('h3').at(0).text()).toEqual('Profile');
  });
  it('Dashboard should have h3 at 1 with Calendar/Schedule text', () => {
    let app = shallow(<Dashboard />);
    expect(app.find('h3').at(1).text()).toEqual('Calendar/Schedule');
  });
});
