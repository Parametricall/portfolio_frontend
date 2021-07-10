import React from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';

function UserListItem(props) {
    const {userId, username, onUserSelect} = props;
    const {url} = useRouteMatch();
    return (
        <ListGroup.Item key={userId}>
            <InputGroup>
                <InputGroup.Prepend>
                    <Form.Check
                        className="float-right"
                        type="checkbox"
                        onChange={(e) => onUserSelect(e.target.checked, userId)}
                    />
                </InputGroup.Prepend>
                <Link to={`${url}/${userId}`} className="user-list-username">{username}</Link>
            </InputGroup>
        </ListGroup.Item>
    );
}

export default UserListItem;
