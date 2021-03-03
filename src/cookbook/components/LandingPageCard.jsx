import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Col, Row } from "react-bootstrap";

function LandingPageCard(props) {
  const { url, recipe, onCardSelect } = props;
  return (
    <Card className="recipe-card">
      <LinkContainer to={`${url}/${recipe.id}`}>
        <button className="recipe-card-button">
          <Row>
            <Col>
              <Row>
                <Col className="recipe-card-checkbox-col">
                  <input
                    className="recipe-card-checkbox"
                    type="checkbox"
                    onClick={(e) => onCardSelect(e, recipe.id)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Body className="recipe-card-body">
                    <Card.Title className="recipe-card-title">
                      {recipe.name}
                    </Card.Title>
                  </Card.Body>
                </Col>
              </Row>
            </Col>
          </Row>
        </button>
      </LinkContainer>
    </Card>
  );
}

export default LandingPageCard;
