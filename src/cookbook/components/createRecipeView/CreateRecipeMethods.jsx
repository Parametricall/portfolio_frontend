import React from "react";
import { IconButton, List, ListItem, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreateRecipeMethod from "./CreateRecipeMethod";
import { emptyMethod } from "./index";

const useStyles = makeStyles((theme) => ({
  addMethod: {
    marginLeft: "50%",
  },
}));

function CreateRecipeMethods({ value, onChange }) {
  const classes = useStyles();

  const handleAddMethod = () => {
    const extendedMethods = [...value, emptyMethod()];
    onChange(extendedMethods);
  };

  const handleOnMethodChange = (index, method) => {
    const methods = [...value];
    methods[index] = method;
    onChange(methods);
  };

  const handleDeleteMethod = (index) => {
    const methods = [...value];
    methods.splice(index, 1);
    onChange(methods);
  };

  const methods = value.map((method, index) => {
    return (
      <ListItem key={method.__key__}>
        <CreateRecipeMethod
          value={method}
          index={index}
          onChange={handleOnMethodChange}
          onDelete={handleDeleteMethod}
        />
      </ListItem>
    );
  });
  return (
    <List>
      {methods}
      <IconButton onClick={handleAddMethod} className={classes.addMethod}>
        <AddIcon />
      </IconButton>
    </List>
  );
}

export default CreateRecipeMethods;
