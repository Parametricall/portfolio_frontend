import React, { useState } from "react";
import { postData } from "../../utilities";
import { CREATE_RECIPE_URL } from "../../constants";
import { Button, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

function CreateRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [food, setFood] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const [redirect, setRedirect] = useState(false);

  const createRecipe = () => {
    postData(CREATE_RECIPE_URL, {
      name: recipeName,
      ingredients: [
        {
          food: { name: food },
          quantity: quantity,
        },
      ],
    }).then((json) => {
      setRedirect(true);
    });
  };

  if (redirect) {
    return <Redirect to="/cookbook" />;
  }

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group>
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control
            onChange={(e) => setRecipeName(e.target.value)}
            value={recipeName}
          />
        </Form.Group>

        <h3>Ingredients</h3>
        <hr />
        <h4>Food</h4>
        <Form.Group>
          <Form.Label>Food</Form.Label>
          <Form.Control
            onChange={(e) => setFood(e.target.value)}
            value={food}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={createRecipe}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CreateRecipe;
