import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchData } from "../../../utilities";
import { CREATE_RECIPE_URL } from "../../../constants";
import { Redirect } from "react-router-dom";
import DynamicList from "../../../components/DynamicList";
import CreateRecipeIngredient from "./CreateRecipeIngredient";
import CreateRecipeMethod from "./CreateRecipeMethod";

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

const useStyles = makeStyles(() => ({
  title: {
    margin: "20px",
  },
  submitButton: {
    float: "right",
  },
}));

function CreateRecipe() {
  const classes = useStyles();
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
    await fetchData(CREATE_RECIPE_URL, "POST", postData);
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/cookbook" />;

  return (
    <Container maxWidth="md">
      <TextField
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        placeholder="Recipe Name"
        className={classes.title}
      />
      <DynamicList
        valueList={ingredients}
        onChange={setIngredients}
        emptyChildCallback={emptyIngredient}
        idKey={"__key__"}
        Component={CreateRecipeIngredient}
      />
      <DynamicList
        valueList={methods}
        onChange={setMethods}
        emptyChildCallback={emptyMethod}
        idKey={"__key__"}
        Component={CreateRecipeMethod}
      />
      <Button
        className={classes.submitButton}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}

export default CreateRecipe;
