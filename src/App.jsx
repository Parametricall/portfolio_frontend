import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import LandingPage from './components/LandingPage';
import User from './user/components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav"/>
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/users">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>

        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route path="/users">
            <User/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
