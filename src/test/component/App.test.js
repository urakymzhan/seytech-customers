import React from 'react';
// import { render } from '@testing-library/react';
import App from '../../App';
import Navbar from '../../components/Navbar';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('<App> component tests', () => {
  it('renders <App> component correctly', () => {
    shallow(<App />);
  });
  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot(); // https://jestjs.io/docs/en/snapshot-testing
  });

  it('renders <Navbar> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Navbar).length).toEqual(1);
  });

  // ask them to add more tests...

  it('renders 1 menu items correctly', () => {
    let app = mount(<App />);
    // console.log(app.debug());
    expect(app.find('.menu').length).toEqual(1);
  });
});
