import React from "react";
import { TextField } from "@material-ui/core";

function CreateRecipeTitle({ value, onChange }) {
  return (
    <>
      <h3>Recipe Name</h3>
      <TextField
        variant="standard"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

export default CreateRecipeTitle;
