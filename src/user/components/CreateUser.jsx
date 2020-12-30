import React, { useState } from 'react';
import { postData } from '../../utilities';
import { CREATE_USER_URL } from '../../constants';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [redirect, setRedirect] = useState(false);

  const createUser = () => {
    postData(CREATE_USER_URL, {username, first_name: firstName, last_name: lastName, email})
      .then(json => {
        setRedirect(true)
      });
  };


  if (redirect) {
    return (
      <Redirect to="/users" />
    )
  }

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={(e) => setUsername(e.target.value)} value={username}/>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>First name</Form.Label>
            <Form.Control placeholder="first name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="last name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
                        value={email}/>
        </Form.Group>
        <Button variant="primary" type="button" onClick={createUser}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CreateUser;