import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import LandingPage from './components/LandingPage';
import User from './user/components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Login from './user/components/Login';
import Logout from './user/components/Logout';
import { postData } from './utilities';
import { GET_TOKEN_URL } from './constants';
import { NavDropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Cookbook from './cookbook/components'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const handleLogin = async (e, username, password) => {
    e.preventDefault();
    const user = {username, password};
    localStorage.clear()
    const response = await postData(GET_TOKEN_URL, user).then(json => json);
    setUser(response);
    localStorage.setItem('user', JSON.stringify(response));
  };

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav"/>
        <Nav className="mr-auto">
          <LinkContainer to="/home">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {user ?
            <NavDropdown title={user.username} id="basic-nav-dropdown">
              <LinkContainer to={`/users/${user.user_id}`}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/users">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/logout">
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            :
            <LinkContainer className='app-login' to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          }
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/home">
          <LandingPage/>
        </Route>
        <Route path="/cookbook">
          <Cookbook />
        </Route>
        <ProtectedRoute path="/users">
          <User/>
        </ProtectedRoute>
        <Route path="/login">
          <Login handleLogin={handleLogin} setUser={setUser}/>
        </Route>
        <Route path="/logout">
          <Logout logout={logout}/>
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
