import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { postData } from '../../utilities';
import { CREATE_USER_URL } from '../../constants';
import { Redirect } from 'react-router-dom';


function SignUp() {
  const [redirect, setRedirect] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const createUser = () => {
    postData(CREATE_USER_URL, {username, password, confirm_password: password2})
      .then(json => {
        setRedirect(true);
      });
  };

  if (redirect) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={(e) => setUsername(e.target.value)} value={username}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => setPassword(e.target.value)} value={password}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control onChange={(e) => setPassword2(e.target.value)} value={password2}/>
        </Form.Group>
        <Button variant="primary" type="button" onClick={createUser}>
          SignUp
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;