import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getData, splitArrayIntoChunks } from "../../utilities";
import { FETCH_RECIPE_URL } from "../../constants";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setUserAuthenticated } from "../../actions";

function RecipeDetail({ setUserAuthenticated }) {
  let { recipeId } = useParams();

  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getData(setUserAuthenticated, `${FETCH_RECIPE_URL}${recipeId}/`).then(
      (json) => {
        setRecipeName(json.name);
        setIngredients(json.ingredients);
      }
    );
  }, [recipeId, setUserAuthenticated]);

  let ingredientChunks;
  if (ingredients) {
    ingredientChunks = splitArrayIntoChunks(ingredients, 3);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>{recipeName}</h1>
        </Col>
      </Row>
      <Row />
      {ingredientChunks &&
        ingredientChunks.map((ingredients, index) => {
          return (
            <Row key={index}>
              {ingredients &&
                ingredients.map((ingredient, ingIndex) => {
                  return (
                    <Col key={ingIndex}>
                      {ingredient.quantity}
                      {ingredient.food.name}
                    </Col>
                  );
                })}
            </Row>
          );
        })}
      <div>Recipe Details Section</div>
    </Container>
  );
}

export default connect(null, { setUserAuthenticated })(RecipeDetail);
