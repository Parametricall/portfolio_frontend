import React from 'react';

import { shallow } from 'enzyme';
import UserListItem from '../../../user/components/UserListItem';

jest.mock('react-router-dom');

describe('UserListItem', () => {
  let wrapper;
  let testUserId;
  let testUsername;
  let onUserSelectMock;

  onUserSelectMock = jest.fn();

  it('renders correctly with initial data', () => {
    testUserId = 5;
    testUsername = 'test User';
    wrapper = shallow(
      <UserListItem
        userId={testUserId}
        username={testUsername}
        onUserSelect={onUserSelectMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('when user selects an item', () => {
    beforeEach(() => {
      testUserId = 2;
      testUsername = 'my special user';
      wrapper = shallow(
        <UserListItem
          userId={testUserId}
          username={testUsername}
          onUserSelect={onUserSelectMock}
        />
      );
    });

    it('triggers the parents "userSelected" callback', () => {
      const checkbox = wrapper.find('checkbox');
      checkbox.simulate('click');

      expect(onUserSelectMock).toHaveBeenCalledTimes(1);
    });
  });
});