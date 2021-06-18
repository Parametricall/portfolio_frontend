import React, { useCallback, useEffect, useState } from "react";

import "../style.css";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { fetchData, fetchJsonData } from "../../utilities";
import { DESTROY_RECIPE_URL, GET_RECIPES_URL } from "../../constants";
import { connect } from "react-redux";
import { setUserAuthenticated } from "../../reduxStore/actions";
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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  list: {
    // width: "100%",
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));

function LandingPage() {
  const classes = useStyles();
  let { url } = useRouteMatch();

  const [recipes, setRecipes] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState(null);

  const fetchAllRecipes = useCallback(async () => {
    const recipes = await fetchJsonData(GET_RECIPES_URL, "GET");
    if (recipes) setRecipes(recipes);
    else {
      setRecipes([]);
      setSnackbarText("Failed to load recipes!");
      setShowSnackbar(true);
    }
  }, []);

  const handleDeleteRecipe = async (e, id) => {
    const deleteResponse = await fetchData(
      `${DESTROY_RECIPE_URL}${id}/`,
      "DELETE"
    );

    if (deleteResponse.ok) await fetchAllRecipes();
    else {
      setSnackbarText("Failed to delete recipe!");
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
        <Button
          color="primary"
          variant="outlined"
          component={RouterLink}
          to={`${url}/create`}
        >
          Create Recipe
        </Button>
        <div className={classes.list}>
          <List>
            {recipes.map((recipe) => (
              <ListItem
                component={RouterLink}
                to={`${url}/${recipe.id}`}
                button
                key={recipe.id}
                divider
              >
                <ListItemText primary={recipe.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={(e) => handleDeleteRecipe(e, recipe.id)}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
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
