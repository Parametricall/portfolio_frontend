import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

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
    </div>
  );
}

export default NewMethod;
