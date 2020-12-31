import React, { useEffect, useState } from 'react';
import { deleteData, getData } from '../../utilities';
import { DESTROY_USERS_URL, FETCH_USERS_URL } from '../../constants';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function UserList() {
  let {url} = useRouteMatch();

  const [users, setUsers] = useState(null);
  const [selected, setSelected] = useState([]);

  const fetchData = () => {
    getData(FETCH_USERS_URL)
      .then(json => setUsers(json));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUsers = async () => {

    for (const id of selected) {
      await deleteData(`${DESTROY_USERS_URL}${id}/`)
      .catch(e => console.log(e));
    }
    fetchData();
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
            {users &&
            users.map((user, index) => {
              return (
                <ListGroup.Item key={user.id}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <Form.Check className="float-right" type="checkbox"
                                  onChange={(e) => userSelected(e.target.checked, user.id)}/>
                    </InputGroup.Prepend>
                    <Link to={`${url}/${user.id}`}>{user.username}</Link>
                  </InputGroup>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default UserList;
