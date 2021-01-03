import React, { useState } from 'react';
import { deleteData } from '../../utilities';
import { DESTROY_USERS_URL } from '../../constants';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function UserList({fetchData}) {
  let {url} = useRouteMatch();

  const [users, setUsers] = useState(null);
  const [selected, setSelected] = useState([]);


  const getUserData = async () => {
    const userData = await fetchData();
    setUsers(userData);
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  const deleteUsers = async () => {

    for (const id of selected) {
      await deleteData(`${DESTROY_USERS_URL}${id}/`)
        .catch(e => console.log(e));
    }
    setUsers(fetchData());
  };

  const userSelected = (checked, userId) => {
    if (checked) {
      selected.push(userId);
      setSelected(selected);
    } else {
      const index = selected.indexOf(userId);
      if (index !== -1) {
        selected.splice(index, 1);
        setSelected(selected);
      }
    }
  };

  let errors = null;
  let userList = null;
  if (users) {
    if (users.detail) {
      errors = <InputGroup.Text className='user-list-errors'>{users.detail}</InputGroup.Text>;
    } else {
      userList = users.map((user) => {
        return (
          <ListGroup.Item key={user.id}>
            <InputGroup>
              <InputGroup.Prepend>
                <Form.Check className="float-right" type="checkbox"
                            onChange={(e) => userSelected(e.target.checked, user.id)}/>
              </InputGroup.Prepend>
              <Link to={`${url}/${user.id}`} className='user-list-username'>{user.username}</Link>
            </InputGroup>
          </ListGroup.Item>
        );
      });
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <LinkContainer to={`${url}/create_user`}>
            <Button variant="primary">Create User</Button>
          </LinkContainer>
          <Button variant="danger" onClick={deleteUsers}>Delete Selected</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <ListGroup>
            {errors}
            {userList}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default UserList;
