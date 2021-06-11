import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import LandingPage from "./components/LandingPage";
import User from "./user/components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./user/components/Login";
import Logout from "./user/components/Logout";
import { postData } from "./utilities";
import { GET_TOKEN_URL } from "./constants";
import { NavDropdown } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Cookbook from "./cookbook/components";
import ProtectedRoute from "./components/ProtectedRoute";
import SnakeGame from "./snakeGame/components/SnakeGame";
import { AppBar, IconButton, Link, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  grow: {
    flexGrow: 1
  },
  linkHover: {
    "&:hover": {
      color: "unset",
      textDecorationColor: "unset"
    }
  }
}));


function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
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
    const user = { username, password };
    localStorage.clear();
    const response = await postData(GET_TOKEN_URL, user).then((json) => json);
    setUser(response);
    localStorage.setItem("user", JSON.stringify(response));
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={RouterLink} to={`/users/${user?.user_id}`} onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem component={RouterLink} to="/users" onClick={handleMenuClose}>Users</MenuItem>
      <MenuItem component={RouterLink} to="/logout" onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Router>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link className={classes.linkHover} color="inherit" component={RouterLink} to="/home">
                Home
              </Link>
            </Typography>
            <div className={classes.grow} />
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>

      <Switch>
        <Route exact path="/home">
          <LandingPage />
        </Route>
        <Route path="/cookbook">
          <Cookbook />
        </Route>
        <Route path="/snake_game">
          <SnakeGame />
        </Route>
        <ProtectedRoute path="/users">
          <User />
        </ProtectedRoute>
        <Route path="/login">
          <Login handleLogin={handleLogin} setUser={setUser} />
        </Route>
        <Route path="/logout">
          <Logout logout={logout} />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
