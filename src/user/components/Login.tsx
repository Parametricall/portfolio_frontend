import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { setUser2, setUserAuthenticated } from '../../reduxStore/actions';
import { fetchJsonData, postData } from '../../utilities';
import { GET_TOKEN_URL, RETRIEVE_USERS_URL } from '../../constants';

function Login(props) {
    const dispatch = useDispatch();

    const { setUser } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const [redirect, setRedirect] = useState(null);

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { username, password };
        localStorage.clear();
        const response = await postData(GET_TOKEN_URL, user);

        // eslint-disable-next-line no-prototype-builtins
        if (response.hasOwnProperty('non_field_errors')) {
            // unable to authenticate
            setError(response.non_field_errors);
        } else {
            setUser(response);
            localStorage.setItem('user', JSON.stringify(response));
            setRedirect('/');
        }
        const userId = response.user_id;
        const userResponse = await fetchJsonData(
            `${RETRIEVE_USERS_URL}${userId}/`,
            'GET',
        );
        dispatch(setUser2({ ...userResponse, isAuthenticated: true }));
    };

    return (
        <Container className="mt-5">
            {error}
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        value={username}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                    />
                </Form.Group>
                <Button type="submit">Login</Button>
                <hr />
                <Button type="button" onClick={() => setRedirect('/users/signup/')}>
                    Create Account
                </Button>
            </Form>
        </Container>
    );
}

export default connect(null, { setUserAuthenticated })(Login);
