import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

function NewMethod(props) {
  const { method, handleMethodChange } = props;

  const methodId = method.id;
  const [localMethod, setMethod] = useState(method.method);

  const handleLocalMethodChange = (e) => {
    const value = e.target.value;
    setMethod(value);
    handleMethodChange({
      id: methodId,
      method: value,
    });
  };

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>{method.id}</InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control
        value={localMethod}
        onChange={handleLocalMethodChange}
        placeholder="Method"
      />
    </InputGroup>
  );
}

export default NewMethod;
