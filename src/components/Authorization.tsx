import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUser2 } from '../reduxStore/actions';
import { fetchJsonData } from '../utilities';
import { RETRIEVE_USERS_URL } from '../constants';

// export function Authorisation(allowedRoles) {
//   const user = useSelector((state) => state.user);
//   return (WrappedComponent) => {
//     const userGroups = (user && user?.groups) || [];
//
//     const userAllowed = userGroups.some(
//       (group) => allowedRoles.indexOf(group) !== -1
//     );
//
//     if (userAllowed && user.isAuthenticated) {
//       return (props) => <WrappedComponent {...props} userGroups={userGroups} />;
//     } else {
//       return <Redirect to="login/" />;
//     }
//   };
// }

interface UserInterface {
    user_permissions: string[],
    isAuthenticated: boolean
    id: number,
    groups: any
}

export const getuserDetails = async () => {
    const token = localStorage.getItem('user');
    const user = sessionStorage.getItem('user');

    if (user) {
        return { action: 'updateStore', user };
    }

    if (token) {
    // fetch user and update store
        const userId = JSON.parse(token).user_id;
        const userObj = await fetchJsonData(
            `${RETRIEVE_USERS_URL}${userId}/`,
            'GET',
        );
        return { action: 'updateStore', userObj };
    }

    return { action: 'login' };
};

export const userInGroups = (user, groups) => {
    const userGroups = user.groups || [];
    return userGroups.some((group) => groups.indexOf(group) !== -1);
};

export async function Authorisation(props) {
    const { Component, componentProps, allowedGroups } = props;

    const user = useSelector((state: {user: UserInterface}) => state.user);
    const dispatch = useDispatch();
    if (!user.groups) {
        const action = await getuserDetails();
        if (action.action === 'login') {
            return <Redirect to="/login" />;
        }
        dispatch(setUser2(action.user));
    }

    const userAllowed = userInGroups(user, allowedGroups);

    if (userAllowed) {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...componentProps} />;
    }
    return <Redirect to="/login" />;
}

// export function AdminUser(props) {
//     return <Authorisation {...props} allowedGroups={[admin_role]} />;
// }
//
// export function GuestUser(props) {
//     return <Authorisation {...props} allowedGroups={[admin_role, guest_role]} />;
// }

export const adminRole = 1;
export const guestRole = 2;

// export const AdminUser = Authorisation([admin_role]);
// export const GuestUser = Authorisation([admin_role, guest_role]);
