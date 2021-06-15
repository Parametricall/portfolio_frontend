import { Button, Container } from "@material-ui/core";
import React, { useState } from "react";
import CreateRecipeTitle from "./CreateRecipeTitle";
import CreateRecipeIngredients from "./CreateRecipeIngredients";
import { v4 as uuidv4 } from "uuid";
import { fetchData } from "../../../utilities";
import { CREATE_RECIPE_URL } from "../../../constants";
import { Redirect } from "react-router-dom";
import CreateRecipeMethods from "./CreateRecipeMethods";

export const emptyIngredient = () => ({
  id: null,
  food: {},
  quantity: "",
  __isNew__: true,
  __key__: uuidv4(),
});

export const emptyMethod = () => ({
  id: null,
  method: "",
  __isNew__: true,
  __key__: uuidv4(),
});

function CreateRecipe() {
  const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState(null);
  const [ingredients, setIngredients] = useState([emptyIngredient()]);
  const [methods, setMethods] = useState([emptyMethod()]);

  const handleSubmit = async () => {
    const postData = {
      name: title,
      ingredients,
      methods,
    };
    const response = await fetchData(CREATE_RECIPE_URL, "POST", postData);
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/cookbook" />;

  return (
    <Container maxWidth="lg">
      <CreateRecipeTitle value={title} onChange={setTitle} />
      <CreateRecipeIngredients value={ingredients} onChange={setIngredients} />
      <CreateRecipeMethods value={methods} onChange={setMethods} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
}

export default CreateRecipe;
