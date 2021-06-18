import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getData, splitArrayIntoChunks } from "../../utilities";
import { FETCH_RECIPE_URL } from "../../constants";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setUserAuthenticated } from "../../reduxStore/actions";
import DynamicList from "../../components/DynamicList";
import Ingredient from "./Ingredient";
import { Grid } from "@material-ui/core";
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
    ingredientChunks = splitArrayIntoChunks(ingredients, 3);
  }

  return (
    <Container className="recipe-detail-container">
      <h1 style={{ marginTop: "30px" }}>{recipeName}</h1>
      <hr />
      <Grid container>
        {ingredientChunks.map((chunk) => {
          return (
            <Grid item xs={12} md={6}>
              <DynamicList
                valueList={chunk}
                onChange={setIngredients}
                idKey="id"
                Component={Ingredient}
                editable={false}
              />
            </Grid>
          );
        })}
      </Grid>
      <hr />
      <DynamicList
        valueList={methods}
        onChange={setIngredients}
        idKey="id"
        Component={Method}
        editable={false}
      />
    </Container>
  );
}

export default connect(null, { setUserAuthenticated })(RecipeDetail);
