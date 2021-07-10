import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser2 } from '../../reduxStore/actions';

function Logout() {
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
        dispatch(setUser2({ isAuthenticated: false }));
    }, [dispatch]);

    return <h2>You have successfully logged out</h2>;
}

export default Logout;
