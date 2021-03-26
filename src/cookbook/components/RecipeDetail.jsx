import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getData, splitArrayIntoChunks } from "../../utilities";
import { FETCH_RECIPE_URL } from "../../constants";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setUserAuthenticated } from "../../actions";
import IngredientsGroup from "./IngredientsGroup";
import Method from "./Method";

function RecipeDetail({ setUserAuthenticated }) {
  let { recipeId } = useParams();

  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    getData(setUserAuthenticated, `${FETCH_RECIPE_URL}${recipeId}/`).then(
      (json) => {
        setRecipeName(json.name);
        setIngredients(json.ingredients);
        setMethods(json.methods);
      }
    );
  }, [recipeId, setUserAuthenticated]);

  let ingredientChunks;
  if (ingredients) {
    ingredientChunks = splitArrayIntoChunks(ingredients, 2);
  }

  return (
    <Container className="recipe-detail-container">
      <h1 style={{ marginTop: "30px" }}>{recipeName}</h1>
      <hr />
      <IngredientsGroup ingredientChunks={ingredientChunks} />
      <hr />
      {methods &&
        methods.map((method, index) => {
          return <Method key={index + method.id * 1000} method={method} />;
        })}
    </Container>
  );
}

export default connect(null, { setUserAuthenticated })(RecipeDetail);
