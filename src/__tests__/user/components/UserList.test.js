import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import UserList from '../../../user/components/UserList';


// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useRouteMatch: () => ({url: '/users'})
}));


describe('UserList', () => {
  let wrapper;
  let userList;
  let useEffect;

  let mockedUserData;
  let mockFetchData = jest.fn().mockResolvedValue();
  let props = {fetchData: mockFetchData};

  let mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    wrapper = shallow(<MemoryRouter><UserList {...props} /></MemoryRouter>);
    userList = wrapper.find(UserList).dive();
  });

  it('renders correctly', () => {
    expect(userList).toMatchSnapshot();
  });

  describe('when mounted', () => {
    beforeEach(() => {
      mockFetchData = jest.fn();
      props = {fetchData: mockFetchData};
      mockUseEffect();
      wrapper = shallow(<MemoryRouter><UserList {...props} /></MemoryRouter>);
      userList = wrapper.find(UserList).dive();
    });

    it('calls "fetchData" method', () => {
      expect(props.fetchData).toHaveBeenCalled();
    });

    describe('contains valid user data', () => {
      beforeEach(() => {
        mockedUserData = [
          {id: 1, username: 'admin'},
          {id: 2, username: 'bob'}
        ];
        mockFetchData = jest.fn().mockResolvedValue(mockedUserData);
        props = {fetchData: mockFetchData};
        mockUseEffect();
        wrapper = shallow(<MemoryRouter><UserList {...props} /></MemoryRouter>);
        userList = wrapper.find(UserList).dive();
      });

      it('displays each users username', () => {
        const usernameElements = userList.find('.user-list-username');
        expect(usernameElements.length).toEqual(mockedUserData.length);

        for (const n in usernameElements.getElements()) {
          expect(usernameElements.at(n).text()).toEqual(mockedUserData[n].username);
        }
      });
    });

    describe('contains invalid user data', () => {
      beforeEach(() => {
        mockedUserData = {detail: "Authentication credentials were not provided"};
        mockFetchData = jest.fn().mockResolvedValue(mockedUserData);
        props = {fetchData: mockFetchData};
        mockUseEffect();
        wrapper = shallow(<MemoryRouter><UserList {...props} /></MemoryRouter>);
        userList = wrapper.find(UserList).dive();
      });

      it('shows error message', () => {
        const usernameElements = userList.find('.user-list-username');
        expect(usernameElements.length).toEqual(0);

        const errorMessage = userList.find(".user-list-errors");
        expect(errorMessage.text()).toEqual(mockedUserData.detail);
      });
    });
  });
})
;