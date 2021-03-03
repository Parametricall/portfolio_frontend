import React, { useCallback, useEffect, useState } from "react";
import { Button, CardDeck, Container } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import "../style.css";
import { useRouteMatch } from "react-router-dom";
import { deleteData, getData, splitArrayIntoChunks } from "../../utilities";
import { DESTROY_RECIPE_URL, GET_RECIPES_URL } from "../../constants";
import { connect } from "react-redux";
import { setUserAuthenticated } from "../../actions";
import LandingPageCard from "./LandingPageCard";

function LandingPage({ setUserAuthenticated }) {
  let { url } = useRouteMatch();

  const [recipes, setRecipes] = useState();
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

  return (
    <Container>
      <LinkContainer to={`${url}/create`}>
        <Button variant="primary">Create Recipe</Button>
      </LinkContainer>
      <Button variant="danger" onClick={deleteSelected}>
        Delete Selected
      </Button>
      {splitRecipes &&
        splitRecipes.map((recipeChunk, index) => {
          return (
            <CardDeck className="mt-5" key={index}>
              {recipeChunk &&
                recipeChunk.map((recipe, recipeIndex) => {
                  return (
                    <LandingPageCard
                      key={recipeIndex}
                      url={url}
                      recipe={recipe}
                      onCardSelect={onCardSelect}
                    />
                  );
                })}
            </CardDeck>
          );
        })}
    </Container>
  );
}

export default connect(null, { setUserAuthenticated })(LandingPage);
