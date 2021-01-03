import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import LandingPage from '../../components/LandingPage';


describe('Landing page', () => {
  const wrapper = shallow(<MemoryRouter><LandingPage/></MemoryRouter>);
  const landingPage = wrapper.find(LandingPage).dive();

  it('renders correctly', () => {
    expect(landingPage).toMatchSnapshot();
  });
});