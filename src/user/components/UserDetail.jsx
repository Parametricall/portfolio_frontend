import React, { useState, useEffect } from 'react';

import {
    Form, Col, Container, Button,
} from 'react-bootstrap';

import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { RETRIEVE_USERS_URL, UPDATE_USERS_URL } from '../../constants';
import {
    fetchJsonData,
    formatDate,
    getData,
    updateData,
} from '../../utilities';
import { setUserAuthenticated } from '../../reduxStore/actions';

function UserDetail(props) {
    const { userId } = useParams();

    const { setUserAuthenticated } = props;

    // const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isSuperUser, setSuperUser] = useState(false);
    const [isStaff, setStaff] = useState(false);
    const [isActive, setActive] = useState(false);
    const [lastLogin, setLastLogin] = useState(null);
    const [dateJoined, setDateJoined] = useState(null);

    const fetchUser = async () => {
        const userResponse = await fetchJsonData(
            `${RETRIEVE_USERS_URL}${userId}/`,
            'GET',
        );

        setUsername(userResponse.username);
        setFirstName(userResponse.first_name);
        setLastName(userResponse.last_name);
        setEmail(userResponse.email);
        setSuperUser(userResponse.is_superuser);
        setStaff(userResponse.is_staff);
        setActive(userResponse.is_active);
        setLastLogin(userResponse.last_login);
        setDateJoined(userResponse.date_joined);
    };

    useEffect(() => {
        fetchUser().then();
    }, [fetchUser]);

    const updateUser = () => {
        const data = {
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            is_superuser: isSuperUser,
            is_staff: isStaff,
            is_active: isActive,
            date_joined: dateJoined,
            last_login: lastLogin,
        };
        updateData(`${UPDATE_USERS_URL}${userId}/`, data).then((json) => {
            setUsername(json.username);
            setFirstName(json.first_name);
            setLastName(json.last_name);
            setEmail(json.email);
            setSuperUser(json.is_superuser);
            setStaff(json.is_staff);
            setActive(json.is_active);
            setLastLogin(json.last_login);
            setDateJoined(json.date_joined);
        });
    };

    return (
        <Container className="mt-5">
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control readOnly defaultValue={username} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            placeholder="first name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            placeholder="last name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Check
                            type="checkbox"
                            label="is_superuser"
                            onChange={(e) => setSuperUser(e.target.checked)}
                            checked={isSuperUser}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Check
                            type="checkbox"
                            label="is_staff"
                            onChange={(e) => setStaff(e.target.checked)}
                            checked={isStaff}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Check
                            type="checkbox"
                            label="is_active"
                            onChange={(e) => setActive(e.target.checked)}
                            checked={isActive}
                        />
                    </Form.Group>
                </Form.Row>

                {/* <Form.Group> */}
                {/*  <Form.Label>Groups</Form.Label> */}
                {/*  <Form.Control as="select" defaultValue="Choose..."> */}
                {/*    <option>Choose...</option> */}
                {/*    <option>...</option> */}
                {/*  </Form.Control> */}
                {/* </Form.Group> */}

                {/* <Form.Group> */}
                {/*  <Form.Label>Permissions</Form.Label> */}
                {/*  <Form.Control as="select" defaultValue="Choose..."> */}
                {/*    <option>Choose...</option> */}
                {/*    <option>...</option> */}
                {/*  </Form.Control> */}
                {/* </Form.Group> */}

                <Form.Group>
                    <Form.Label>Last Login</Form.Label>
                    <Form.Control
                        readOnly
                        defaultValue={lastLogin && formatDate(lastLogin)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date Joined</Form.Label>
                    <Form.Control
                        readOnly
                        defaultValue={dateJoined && formatDate(dateJoined)}
                    />
                </Form.Group>
                <Button variant="primary" type="button" onClick={updateUser}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default connect(null, { setUserAuthenticated })(UserDetail);
