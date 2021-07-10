import React, { useCallback, useEffect, useState } from 'react';

import '../style.css';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Snackbar,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import { setUserAuthenticated } from '../../reduxStore/actions';
import { DESTROY_RECIPE_URL, GET_RECIPES_URL } from '../../constants';
import { fetchData, fetchJsonData } from '../../utilities';
// import { adminRole, guest_role, userInGroups } from '../../components/Authorization';
import UserPermissions from '../../components/UserPermissions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    list: {
    // width: "100%",
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
    },
}));

// @ts-ignore
function LandingPage() {
    const classes = useStyles();
    const { url } = useRouteMatch();

    // const user = useSelector((state: any) => state.user);

    // const adminUser = userInGroups(user, [adminRole, guest_role]);

    const [recipes, setRecipes] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState<any>(false);
    const [snackbarText, setSnackbarText] = useState<any>(null);

    const fetchAllRecipes = useCallback(async () => {
        const allRecipes = await fetchJsonData(GET_RECIPES_URL, 'GET');
        if (allRecipes) setRecipes(allRecipes);
        else {
            setRecipes([]);
            setSnackbarText('Failed to load recipes!');
            setShowSnackbar(true);
        }
    }, []);

    const handleDeleteRecipe = async (e: any, id: any) => {
        const deleteResponse: any = await fetchData(
            `${DESTROY_RECIPE_URL}${id}/`,
            'DELETE',
        );

        if (deleteResponse.ok) await fetchAllRecipes();
        else {
            setSnackbarText('Failed to delete recipe!');
            setShowSnackbar(true);
        }
    };

    // turn snackbar alerts into a generalised hook
    const handleSnackbarClose = () => {
        setSnackbarText(null);
        setShowSnackbar(false);
    };

    useEffect(() => {
        fetchAllRecipes().then();
    }, [fetchAllRecipes]);

    return (
        <Container maxWidth="md">
            <div className={classes.root}>
                <UserPermissions permissions={['cookbook.add_recipe']}>
                    <Button
                        color="primary"
                        variant="outlined"
                        component={RouterLink}
                        to={`${url}/create`}
                    >
                        Create Recipe
                    </Button>
                </UserPermissions>

                <div className={classes.list}>
                    <List>
                        {recipes.map((recipe: any) => (
                            <ListItem
                                component={RouterLink}
                                to={`${url}/${recipe.id}`}
                                button
                                key={recipe.id}
                                divider
                            >
                                <ListItemText primary={recipe.name} />
                                <ListItemSecondaryAction>
                                    <UserPermissions permissions={['cookbook.delete_recipe']}>
                                        <IconButton
                                            onClick={(e) => handleDeleteRecipe(e, recipe.id)}
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </UserPermissions>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert variant="filled" severity="error">
                        {snackbarText}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}

export default connect(null, { setUserAuthenticated })(LandingPage);
