import React from 'react';
import { shallow } from 'enzyme';

import UserList from '../../../user/components/UserList';


jest.mock('react-router-dom', () => ({
  useRouteMatch: jest.fn().mockReturnValue({
    url: ''
  }),
  withRouter: jest.fn()
}));

describe('UserList', () => {
  const userListWrapper = shallow(<UserList/>);

  it('renders correctly', () => {
    expect(userListWrapper).toMatchSnapshot();
  });
});