import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

function NewIngredient(props) {
  const { ingredient, handleIngredientsChange } = props;

  const [food, setFood] = useState(ingredient.food.name);
  const [quantity, setQuantity] = useState(ingredient.quantity);

  const handleOnQuantityChange = (e) => {
    const value = e.target.value;
    const newQuantity = `${value}`;
    setQuantity(newQuantity);
    handleIngredientsChange({
      food: { name: food },
      quantity: newQuantity,
      id: ingredient.id,
    });
  };

  const handleOnFoodChange = (e) => {
    setFood(e.target.value);
    handleIngredientsChange({
      food: { name: e.target.value },
      quantity,
      id: ingredient.id,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <span style={{ marginLeft: "-30px", alignSelf: "flex-end" }}>
        <Button
          style={{ padding: "unset", boxShadow: "unset" }}
          variant="Light"
          onClick={null}
        >
          <span className="material-icons">delete</span>
        </Button>
      </span>
      <Form.Row>
        <Col>
          <Form.Control
            onChange={handleOnQuantityChange}
            value={quantity}
            placeholder="Quantity"
          />
        </Col>
        {/*<Col>*/}
        {/*  <Form.Control as="select" defaultValue="Unit">*/}
        {/*    <option disabled>Unit</option>*/}
        {/*    <option>mg</option>*/}
        {/*    <option>g</option>*/}
        {/*    <option>Kg</option>*/}
        {/*    <option>ml</option>*/}
        {/*    <option>l</option>*/}
        {/*  </Form.Control>*/}
        {/*</Col>*/}
        <Col xs={9}>
          <Form.Control
            onChange={handleOnFoodChange}
            value={food}
            placeholder="Ingredient"
          />
        </Col>
      </Form.Row>
    </div>
  );
}

export default NewIngredient;
