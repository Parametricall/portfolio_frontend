import React, { useState } from "react";
import { deleteData } from "../../utilities";
import { DESTROY_USERS_URL } from "../../constants";
import { useRouteMatch } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserListItem from "./UserListItem";
import { connect } from "react-redux";
import { setUserAuthenticated } from "../../actions";

function UserList({ fetchData, setUserAuthenticated }) {
  let { url } = useRouteMatch();

  const [users, setUsers] = useState(null);
  const [selected, setSelected] = useState([]);

  React.useEffect(() => {
    fetchData(setUserAuthenticated).then((userData) => setUsers(userData));
  }, [fetchData, setUserAuthenticated]);

  const deleteUsers = async () => {
    for (const id of selected) {
      await deleteData(`${DESTROY_USERS_URL}${id}/`).catch((e) =>
        console.log(e)
      );
    }
    fetchData(setUserAuthenticated).then((userData) => setUsers(userData));
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
      errors = (
        <InputGroup.Text className="user-list-errors">
          {users.detail}
        </InputGroup.Text>
      );
    } else {
      userList = users.map((user) => {
        return (
          <UserListItem
            key={user.id}
            userId={user.id}
            username={user.username}
            onUserSelect={userSelected}
          />
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
          <Button variant="danger" onClick={deleteUsers}>
            Delete Selected
          </Button>
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

export default connect(null, { setUserAuthenticated })(UserList);
