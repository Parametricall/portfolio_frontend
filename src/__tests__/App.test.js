import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';


describe('App', () => {
  const wrapper = shallow(<MemoryRouter><App/></MemoryRouter>);
  const app = wrapper.find(App).dive();

  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  describe('when no user is logged in', () => {
    it('displays "Login" in the nav bar', () => {
      expect(app.find('.app-login').exists()).toBe(true)
    })
  })
});