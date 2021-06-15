import React from "react";
import {
  IconButton,
  ListItemSecondaryAction,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function CreateRecipeMethod({ value, index, onChange, onDelete }) {
  const handleOnMethodChange = (e) => {
    const newMethod = e.target.value;
    onChange(index, { method: newMethod });
  };

  return (
    <>
      <span
        style={{
          padding: "2px",
          fontSize: "24px",
          backgroundColor: "lightgray",
          marginRight: "20px",
          borderRadius: "6px",
        }}
      >
        {index}
      </span>
      <TextField
        variant="outlined"
        placeholder="Method"
        size="small"
        value={value.method}
        onChange={handleOnMethodChange}
      />
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

export default CreateRecipeMethod;
