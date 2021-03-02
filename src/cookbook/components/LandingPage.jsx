import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, CardDeck, Col, Container, Row } from "react-bootstrap";

import chatBot from "../../images/chat_bot.png";
import { LinkContainer } from "react-router-bootstrap";

import "../style.css";
import { useRouteMatch } from "react-router-dom";
import { deleteData, getData, splitArrayIntoChunks } from "../../utilities";
import { DESTROY_RECIPE_URL, GET_RECIPES_URL } from "../../constants";
import { connect } from "react-redux";
import { setUserAuthenticated } from "../../actions";

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
                    <Card className="recipe-card" key={recipeIndex}>
                      <LinkContainer to={`${url}/${recipe.id}`}>
                        <button>
                          <Row>
                            <Col>
                              <Card.Img src={chatBot} />
                            </Col>
                            <Col>
                              <Row>
                                <Col className="recipe-card-checkbox-col">
                                  <input
                                    className="recipe-card-checkbox"
                                    type="checkbox"
                                    onClick={(e) => onCardSelect(e, recipe.id)}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Card.Body className="recipe-card-body">
                                    <Card.Title>{recipe.name}</Card.Title>
                                    <Card.Text>
                                      A simple cookbook to help keep track of
                                      your favourite recipes.
                                    </Card.Text>
                                  </Card.Body>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </button>
                      </LinkContainer>
                    </Card>
                  );
                })}
            </CardDeck>
          );
        })}
    </Container>
  );
}

export default connect(null, { setUserAuthenticated })(LandingPage);
