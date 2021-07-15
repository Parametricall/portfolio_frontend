import React, { useCallback, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
    Button, Col, Container, InputGroup, ListGroup, Row,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';
import { DESTROY_USERS_URL, FETCH_USERS_URL } from '../../constants';
import { deleteData, fetchJsonData } from '../../utilities';
import { setUserAuthenticated } from '../../reduxStore/actions';

function UserList({ setUserAuthenticated: setUserAuthenticatedOld }) {
    const { url } = useRouteMatch();

    const [users, setUsers] = useState(null);
    const [selected, setSelected] = useState([]);

    const fetchData = useCallback(
        async () => fetchJsonData(FETCH_USERS_URL, 'GET'),
        [],
    );

    React.useEffect(() => {
        fetchData().then((userData) => setUsers(userData));
    }, [fetchData, setUserAuthenticatedOld]);

    const deleteUsers = async () => {
        // eslint-disable-next-line no-restricted-syntax
        for (const id of selected) {
            // eslint-disable-next-line no-await-in-loop
            await deleteData(`${DESTROY_USERS_URL}${id}/`).catch();
        }
        fetchData().then((userData) => setUsers(userData));
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
            userList = users.map((user) => (
                <UserListItem
                    key={user.id}
                    userId={user.id}
                    username={user.username}
                    onUserSelect={userSelected}
                />
            ));
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
