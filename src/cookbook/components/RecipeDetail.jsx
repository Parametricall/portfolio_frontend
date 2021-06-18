import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  fetchData,
  fetchJsonData,
  getData,
  splitArrayIntoChunks,
} from "../../utilities";
import { FETCH_RECIPE_URL, UPDATE_RECIPE_URL } from "../../constants";
import { useParams } from "react-router-dom";
import { connect, useStore } from "react-redux";
import { setUserAuthenticated } from "../../reduxStore/actions";
import DynamicList from "../../components/DynamicList";
import Ingredient from "./Ingredient";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import Method from "./Method";
import RecipeName from "./RecipeName";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  editIcons: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "end",
  },
}));

function RecipeDetail({ setUserAuthenticated }) {
  const classes = useStyles();
  let { recipeId } = useParams();

  const [editable, setEditable] = useState(false);

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

  const handleUpdateRecipe = useCallback(async () => {
    const postData = {
      name: recipeName,
      ingredients,
      methods,
    };
    const response = await fetchJsonData(
      `${UPDATE_RECIPE_URL}${recipeId}/`,
      "PUT",
      postData
    );
    if (response) {
      setEditable(false);
    }
  }, [ingredients, methods, recipeId, recipeName]);

  return (
    <Container className="recipe-detail-container">
      <div className={classes.editIcons}>
        <IconButton aria-label="edit" onClick={() => setEditable(!editable)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="save" onClick={handleUpdateRecipe}>
          <SaveIcon />
        </IconButton>
      </div>

      <RecipeName
        value={recipeName}
        onChange={setRecipeName}
        editable={editable}
      />

      <hr />
      {editable ? (
        <DynamicList
          valueList={ingredients}
          onChange={setIngredients}
          idKey="id"
          Component={Ingredient}
          editable={editable}
        />
      ) : (
        <Grid container>
          {ingredientChunks.map((chunk) => {
            return (
              <Grid item xs={12} md={6}>
                <DynamicList
                  valueList={chunk}
                  onChange={setIngredients}
                  idKey="id"
                  Component={Ingredient}
                  editable={editable}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      <hr />
      <DynamicList
        valueList={methods}
        onChange={setIngredients}
        idKey="id"
        Component={Method}
        editable={editable}
      />
    </Container>
  );
}

export default connect(null, { setUserAuthenticated })(RecipeDetail);
