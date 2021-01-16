import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserAuthenticated } from '../../actions';
import { postData } from '../../utilities';
import { GET_TOKEN_URL } from '../../constants';


function Login(props) {
  const {setUser} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [redirect, setRedirect] = useState(null);

  if (redirect) {
    return (
      <Redirect to={redirect}/>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {username, password};
    localStorage.clear();
    const response = await postData(GET_TOKEN_URL, user);

    if (response.hasOwnProperty('non_field_errors')) {
      // unable to authenticate
      setError(response.non_field_errors);
    } else {
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
      setRedirect('/');
    }
  };

  return (
    <Container className="mt-5">
      {error}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Username"
            onChange={({target}) => setUsername(target.value)}
            value={username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={({target}) => setPassword(target.value)}
            value={password}
          />
        </Form.Group>
        <Button type="submit">Login</Button>
        <hr/>
        <Button type='button' onClick={() => setRedirect('/users/signup/')}>Create Account</Button>
      </Form>
    </Container>
  );
}

export default connect(null, {setUserAuthenticated})(Login);