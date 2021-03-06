import React from "react";
import { Col, Row } from "react-bootstrap";

function Method(props) {
  const { method } = props;
  return (
    <Row>
      <Col>{`${method.id}. ${method.method}`}</Col>
    </Row>
  );
}

export default Method;
