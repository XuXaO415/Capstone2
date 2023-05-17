import React, { useState, useContext, useEffect } from "react";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import "./LoginForm.css";

/** Form for logging in. */

function LoginForm({ login }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { currentUser } = useContext(UserContext);
  const [formErrors, setFormErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      // history.push("username/match/:user_id");
      history.push("/matches");
    } catch (errors) {
      setFormErrors(errors);
    }
  };


  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  }

  return (
    // <div className="LoginForm">
    //   <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
    //     <h1 className="mb-3">Log In</h1>
    //     <Form validated={validated} onSubmit={handleSubmit}>
    //       <div className="form-group">
    //         <form label>Username: </form>
    //         <form
    //           type="text"
    //           name="username"
    //           placeholder="Username"
    //           className="form-control"
    //           value={formData.username}
    //           onChange={handleChange}
    //           required
    //         />
    //         <Form.Control.Feedback type="invalid">
    //           Please enter a username.
    //         </Form.Control.Feedback>
    //       </div>
    //       <div className="form-group">
    //         <form label>Password: </form>
    //         <form input
    //           type="password"
    //           placeholder="Password"
    //           name="password"
    //           className="form-control"
    //           value={formData.password}
    //           onChange={handleChange}
    //           required
    //         />
    //         <Form.Control.Feedback type="invalid">
    //           Please enter a password.
    //         </Form.Control.Feedback>
    //       </div>


    //       <Button className="btn" variant="primary" type="submit">
    //         Submit
    //       </Button>
    //     </Form>
    //     <p className="mt-5 font-weight-bold">New to UrGuide? <NavLink to="/register">Sign Up</NavLink>
    //   </p>
    //   </div>
    // </div>



<Container className="LoginForm">
  <div className="container mb-3">
        <h1 className="mb-3">Sign Up</h1>
        <Form onSubmit={handleSubmit}>
       
            <Form.Group className="mb-3" controlId="formGridUsername">
              <Form.Label >Username:</Form.Label>
              <Form.Control
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
   
              <Button variant="primary" type="submit" onSubmit={handleSubmit}>
            Sign in
          </Button>
          <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
        </Form>
         <p className="mt-5 font-weight-bold">New to UrGuide? <NavLink to="/register">Sign Up</NavLink>
      </p>
      </div>
    </Container>
  );
}

export default LoginForm;
