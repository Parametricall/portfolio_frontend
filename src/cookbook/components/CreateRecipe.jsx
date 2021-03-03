import React, { useState } from "react";
import { postData } from "../../utilities";
import { CREATE_RECIPE_URL } from "../../constants";
import { Button, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewIngredient from "./NewIngredient";
import _ from "lodash";
import NewMethod from "./NewMethod";

function CreateRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [ingredients, setIngredients] = useState([
    { food: { name: "" }, quantity: "", id: 0 },
  ]);
  const [methods, setMethods] = useState([{ id: 1, method: "" }]);

  const addNewIngredient = () => {
    const newId = ingredients.length;

    const newIngredient = {
      food: { name: "" },
      quantity: "",
      id: newId,
    };

    setIngredients([...ingredients, newIngredient]);
  };

  const addNewMethod = () => {
    const newId = methods.length + 1;
    const newMethod = {
      id: newId,
      method: "",
    };
    setMethods([...methods, newMethod]);
  };

  const handleIngredientsChange = (newIngredient) => {
    const ingredientsCopy = _.cloneDeep(ingredients);

    const newIngredients = ingredientsCopy.map((ingredient) => {
      if (ingredient.id === newIngredient.id) {
        return newIngredient;
      }
      return ingredient;
    });

    setIngredients(newIngredients);
  };

  const handleMethodChange = (newMethod) => {
    const methodsCopy = _.cloneDeep(methods);
    const newMethods = methodsCopy.map((method) => {
      if (method.id === newMethod.id) {
        return newMethod;
      }
      return method;
    });
    setMethods(newMethods);
  };

  const createRecipe = () => {
    postData(CREATE_RECIPE_URL, {
      name: recipeName,
      ingredients: ingredients,
      methods: methods,
    }).then(() => {
      setRedirect(true);
    });
  };

  if (redirect) {
    return <Redirect to="/cookbook" />;
  }

  const ing = ingredients.map((ingredient, index) => {
    return (
      <NewIngredient
        key={index}
        ingredient={ingredient}
        handleIngredientsChange={handleIngredientsChange}
      />
    );
  });

  const meth = methods.map((method, index) => {
    return (
      <NewMethod
        key={index}
        method={method}
        handleMethodChange={handleMethodChange}
      />
    );
  });

  return (
    <Container className="mt-5">
      <Form>
        <h3>Recipe Name</h3>
        <Form.Group>
          {/*<Form.Label>Recipe Name</Form.Label>*/}
          <Form.Control
            onChange={(e) => setRecipeName(e.target.value)}
            value={recipeName}
          />
        </Form.Group>
        <h3>Ingredients</h3>
        {ing}
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ padding: "unset", boxShadow: "unset" }}
            variant="Light"
            onClick={addNewIngredient}
          >
            <span style={{ fontSize: "60px" }} className="material-icons">
              add_circle_outline
            </span>
          </Button>
        </div>
        <h3>Method</h3>
        {meth}
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ padding: "unset", boxShadow: "unset" }}
            variant="Light"
            onClick={addNewMethod}
          >
            <span style={{ fontSize: "60px" }} className="material-icons">
              add_circle_outline
            </span>
          </Button>
        </div>
        <hr />
        <Button variant="primary" type="button" onClick={createRecipe}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CreateRecipe;
