import React from "react";
import {
  IconButton,
  ListItemSecondaryAction,
  makeStyles,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  methodIndex: {
    paddingTop: "0.2rem",
    fontSize: "1.2rem",
    background: "cadetblue",
    marginRight: "0.8rem",
    borderRadius: "50%",
    color: "white",
    width: "2rem",
    height: "2rem",
    textAlign: "center",
    boxSizing: "border-box",
    fontFamily: "cursive",
  },
  methodTextField: {
    width: "90%",
  },
}));

function CreateRecipeMethod({ value, index, onChange, onDelete }) {
  const classes = useStyles();
  const handleOnMethodChange = (e) => {
    const newMethod = e.target.value;
    onChange(index, { method: newMethod });
  };

  return (
    <>
      <span className={classes.methodIndex}>{index + 1}</span>
      <TextField
        variant="outlined"
        placeholder="Method"
        size="small"
        value={value.method}
        onChange={handleOnMethodChange}
        multiline
        className={classes.methodTextField}
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
