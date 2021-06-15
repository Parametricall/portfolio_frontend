import React from "react";
import { Col, Row } from "react-bootstrap";

function IngredientsGroup(props) {
  const { ingredientChunks } = props;
  return (
    <>
      {ingredientChunks &&
        ingredientChunks.map((ingredients, index) => {
          return (
            <Row key={index}>
              {ingredients &&
                ingredients.map((ingredient, ingIndex) => {
                  return (
                    <React.Fragment key={ingIndex}>
                      <Col xs={1}>{ingredient?.quantity}</Col>
                      <Col>{ingredient?.food?.name}</Col>
                    </React.Fragment>
                  );
                })}
            </Row>
          );
        })}
    </>
  );
}

export default IngredientsGroup;
