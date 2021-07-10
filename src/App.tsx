import React, { useEffect } from 'react';
import {
    BrowserRouter as Router, Link as RouterLink, Redirect, Route, Switch,
} from 'react-router-dom';
import {
    AppBar, IconButton, Link, makeStyles, Menu, MenuItem, Toolbar, Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import LandingPage from './components/LandingPage';
import User from './user/components';
import Login from './user/components/Login';
import Logout from './user/components/Logout';
import { fetchJsonData, postData } from './utilities';
import { GET_TOKEN_URL, RETRIEVE_USERS_URL } from './constants';
import Cookbook from './cookbook/components';
import SnakeGame from './snakeGame/components/SnakeGame';
import { setUser2 } from './reduxStore/actions';
import UserPermissions from './components/UserPermissions';

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    grow: {
        flexGrow: 1,
    },
    linkHover: {
        '&:hover': {
            color: 'unset',
            textDecorationColor: 'unset',
        },
    },
}));

async function updateStoreFromUserToken(dispatch) {
    const token = localStorage.getItem('user');
    // const user = sessionStorage.getItem('user');

    if (token) {
        const userId = JSON.parse(token).user_id;
        const userObj = await fetchJsonData(
            `${RETRIEVE_USERS_URL}${userId}/`,
            'GET',
            null,
        );
        // todo: handle error response here
        dispatch(setUser2({ ...userObj, isAuthenticated: true }));
    }
}

interface UserInterface {
    user_permissions: string[],
    isAuthenticated: boolean
    id: number,
}

function App() {
    const classes = useStyles();
    // const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const currentUser = useSelector((state:{user: UserInterface}) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser.isAuthenticated) {
            updateStoreFromUserToken(dispatch).then();
        }
    });

    // useEffect(() => {
    //     const getUser = async () => {
    //
    //         if (!currentUser.groups) {
    //             const action = await getuserDetails();
    //             if (action.action === "login") {
    //                 return <Redirect to="/login" />;
    //             } else {
    //                 dispatch(setUser2(action.user));
    //             }
    //         }
    //     };
    //     getUser();
    // });

    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {
    //         const foundUser = JSON.parse(loggedInUser);
    //         setUser(foundUser);
    //     }
    // }, []);

    // const logout = () => {
    //     localStorage.clear();
    //     dispatch(setUser2({ isAuthenticated: false }));
    //     // setUser(null);
    // };

    const handleLogin = async (e, username, password) => {
        e.preventDefault();
        const userCred = { username, password };
        localStorage.clear();
        const response = await postData(GET_TOKEN_URL, userCred).then((json) => json);
        // setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <UserPermissions showIfAuthenticated={false}>
                <MenuItem component={RouterLink} to="/login" onClick={handleMenuClose}>
                    Login
                </MenuItem>
            </UserPermissions>
            <UserPermissions permissions={['auth.view_user']}>
                <MenuItem
                    component={RouterLink}
                    to={`/users/${currentUser?.id}`}
                    onClick={handleMenuClose}
                >
                    Profile
                </MenuItem>
            </UserPermissions>
            <UserPermissions permissions={['auth.add_user']}>
                <MenuItem component={RouterLink} to="/users" onClick={handleMenuClose}>
                    Users
                </MenuItem>
            </UserPermissions>
            <UserPermissions>
                <MenuItem component={RouterLink} to="/logout" onClick={handleMenuClose}>
                    Logout
                </MenuItem>
            </UserPermissions>
        </Menu>
    );

    return (
        <Router>
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            <Link
                                className={classes.linkHover}
                                color="inherit"
                                component={RouterLink}
                                to="/home"
                            >
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
                <Route path="/users">
                    <User />
                </Route>
                <Route path="/login">
                    <Login
                        handleLogin={handleLogin}
                        setUser={() => {
                        }}
                    />
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
                <Route path="/">
                    <Redirect to="/home" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
