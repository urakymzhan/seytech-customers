import React from 'react';
import About from '../../components/About';
import { shallow } from 'enzyme';

describe('<App>', () => {
  it('renders header correctly', () => {
    const wrapper = shallow(<About />);
    const header = <h1>Seytech</h1>;
    expect(wrapper.contains(header)).toEqual(true);
  });
});
