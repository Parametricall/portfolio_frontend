import React, { useCallback, useEffect, useState } from "react";
import { Button, CardDeck, Container } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import "../style.css";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { deleteData, getData, splitArrayIntoChunks } from "../../utilities";
import { DESTROY_RECIPE_URL, GET_RECIPES_URL } from "../../constants";
import { connect } from "react-redux";
import { setUserAuthenticated } from "../../actions";
import LandingPageCard from "./LandingPageCard";
import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function LandingPage({ setUserAuthenticated }) {
  const classes = useStyles();
  let { url } = useRouteMatch();

  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState([]);

  const fetchData = useCallback(() => {
    getData(setUserAuthenticated, GET_RECIPES_URL).then((json) =>
      setRecipes(json)
    );
  }, [setUserAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let splitRecipes;
  if (recipes) {
    splitRecipes = splitArrayIntoChunks(recipes, 3);
  }

  const onCardSelect = (e, recipeId) => {
    e.stopPropagation();
    const checked = e.target.checked;
    if (checked) {
      selected.push(recipeId);
      setSelected(selected);
    } else {
      const index = selected.indexOf(recipeId);
      if (index !== -1) {
        selected.splice(index, 1);
        setSelected(selected);
      }
    }
  };

  const deleteSelected = async () => {
    for (const id of selected) {
      await deleteData(`${DESTROY_RECIPE_URL}${id}/`).catch((e) =>
        console.log(e)
      );
    }
    setSelected([]);
    fetchData();
  };

  const handleDeleteRecipe = async (e, id) => {
    await deleteData(`${DESTROY_RECIPE_URL}${id}/`).catch((e) =>
      console.log(e)
    );
    fetchData();
  };

  return (
    <Container>
      <div className={classes.root}>
        <LinkContainer to={`${url}/create`}>
          <Button variant="primary">Create Recipe</Button>
        </LinkContainer>
        <Button variant="danger" onClick={deleteSelected}>
          Delete Selected
        </Button>
        <div className={classes.list}>
          <List>
            {recipes.map((recipe) => (
              <ListItem
                component={RouterLink}
                to={`${url}/${recipe.id}`}
                button
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
      </div>
    </Container>
  );
}

export default connect(null, { setUserAuthenticated })(LandingPage);
