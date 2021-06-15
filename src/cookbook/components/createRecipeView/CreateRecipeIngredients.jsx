import React from "react";
import { IconButton, List, ListItem, makeStyles } from "@material-ui/core";
import CreateRecipeIngredient from "./CreateRecipeIngredient";
import AddIcon from "@material-ui/icons/Add";
import { emptyIngredient } from "./index";

const useStyles = makeStyles((theme) => ({
  addIngredient: {
    marginLeft: "50%",
  },
}));

function CreateRecipeIngredients({ value, onChange }) {
  const classes = useStyles();
  const handleIngredientChange = (index, ingredient) => {
    const ingredients = [...value];
    ingredients[index] = ingredient;
    onChange(ingredients);
  };

  const handleAddIngredient = () => {
    const extendedIngredients = [...value, emptyIngredient()];
    onChange(extendedIngredients);
  };

  const handleDeleteIngredient = (index) => {
    const ingredients = [...value];
    ingredients.splice(index, 1);
    onChange(ingredients);
  };

  const ingredients = value.map((ingredient, index) => {
    return (
      <ListItem key={ingredient.__key__}>
        <CreateRecipeIngredient
          value={ingredient}
          index={index}
          onDelete={handleDeleteIngredient}
          onChange={handleIngredientChange}
        />
      </ListItem>
    );
  });

  return (
    <List>
      {ingredients}
      <IconButton
        onClick={handleAddIngredient}
        className={classes.addIngredient}
      >
        <AddIcon />
      </IconButton>
    </List>
  );
}

export default CreateRecipeIngredients;
