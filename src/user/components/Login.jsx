import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


function Login(props) {
  const {handleLogin} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [redirect, setRedirect] = useState(null);

  if (redirect) {
    return (
      <Redirect to={redirect}/>
    );
  }

  return (
    <Container className="mt-5">
      <Form onSubmit={(e) => {
        const res = handleLogin(e, username, password)
        if (res) {
          setRedirect('/')
        }
      }}>
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

export default Login;