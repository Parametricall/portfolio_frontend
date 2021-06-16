import React, { useState } from "react";
import {
  IconButton,
  ListItemSecondaryAction,
  makeStyles,
  TextField,
} from "@material-ui/core";
import AsyncCreatableSelect from "react-select/async-creatable/dist/react-select.esm";
import { getData } from "../../../utilities";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  quantity: {
    width: "20%",
    marginLeft: "0.8rem",
    marginRight: "0.8rem",
  },
  food: {
    width: "50%",
  },
  dotPoint: {
    background: "cadetblue",
    marginRight: "0.8rem",
    marginLeft: "0.5rem",
    borderRadius: "50%",
    color: "white",
    width: "0.6rem",
    height: "0.6rem",
  },
}));

function CreateRecipeIngredient({ value, index, onDelete, onChange }) {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(value.quantity);
  const [food, setFood] = useState(value.food);

  const options = async () => {
    const response = await getData(() => {},
    "http://127.0.0.1:8000/api/cookbook/food/");

    return response.map((food) => {
      return { value: food.id, label: food.name };
    });
  };

  const handleOnFoodChange = (selectedFood) => {
    const newFood = { id: selectedFood.value, name: selectedFood.label };
    setFood(newFood);
    onChange(index, { ...value, quantity, food: newFood });
  };

  const handleOnQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    onChange(index, { ...value, quantity: newQuantity, food });
  };

  return (
    <>
      <span className={classes.dotPoint} />
      <TextField
        className={classes.quantity}
        variant="outlined"
        placeholder="Quantity"
        size="small"
        value={value.quantity}
        onChange={handleOnQuantityChange}
      />
      <div className={classes.food}>
        <AsyncCreatableSelect
          defaultOptions
          loadOptions={options}
          onChange={handleOnFoodChange}
          value={{ value: food?.id, label: food?.name }}
        />
      </div>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(index)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
}

export default CreateRecipeIngredient;
