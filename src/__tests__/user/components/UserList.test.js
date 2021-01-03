import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import UserList from '../../../user/components/UserList';


// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useRouteMatch: () => ({ url: '/users' }),
}));

describe('UserList', () => {
  const wrapper = shallow(<MemoryRouter><UserList/></MemoryRouter>, {context: ''});
  const userList = wrapper.find(UserList).dive()

  it('renders correctly', () => {
    expect(userList).toMatchSnapshot();
  });
});