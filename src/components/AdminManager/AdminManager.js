import React, { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { Button, Form } from "react-bootstrap";

import { functions } from "../../Config/Firebase";

const AdminManager = () => {
  const [adminEmail, setAdminEmail] = useState("");

  const adminEmailHandler = (e) => {
    console.log(e.target.value);
    setAdminEmail(e.target.value);
  };

  const addAdminHandler = (e) => {
    e.preventDefault();
    const addAdmin = httpsCallable(functions, "addAdminRole");
    addAdmin({ email: adminEmail }).then((result) => {
      console.log(result);
    });
  };

  return (
    <Form onSubmit={addAdminHandler}>
      <Form.Group className="mb-3" controlId="AdminEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={adminEmail}
          onChange={adminEmailHandler}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AdminManager;
