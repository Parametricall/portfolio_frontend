import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import AsyncCreatableSelect from "react-select/async-creatable";
import { getData } from "../../utilities";

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
    setFood(e.label);
    handleIngredientsChange({
      food: { name: e.label },
      quantity,
      id: ingredient.id,
    });
  };

  const options = async () => {
    const response = await getData(() => {},
    "http://127.0.0.1:8000/api/cookbook/food/");

    return response.map((food) => {
      return { value: food.id, label: food.name };
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
          {/*<Form.Control*/}
          {/*  onChange={handleOnFoodChange}*/}
          {/*  value={food}*/}
          {/*  placeholder="Ingredient"*/}
          {/*/>*/}
          <AsyncCreatableSelect
            defaultOptions
            loadOptions={options}
            // onChange={handleOnFoodChange}
          />
        </Col>
      </Form.Row>
    </div>
  );
}

export default NewIngredient;
