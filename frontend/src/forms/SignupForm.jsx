import React, { useEffect, useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import Alert from "../common/Alert";
import "./SignupForm.css";

import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";

function SignupForm({ register }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    hobbies: "",
    interests: ""
  });

  const { Formik } = formik;

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    passwordConfirm: yup.string().required("Password confirmation is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is optional"),
    state: yup.string().required("State is required"),
    zipCode: yup.string().required("Zip code is required"),
    hobbies: yup.string().required("Hobbies are required"),
    interests: yup.string().required("Interests are required")
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    // "SignupForm",
    // "signup=",
    //typeof signup,
    "formErrors=",
    formErrors,
    "formData=",
    formData
  );

  // const isValidZipCode = (val) => {
  //   //https://regexr.com/3e48o => regex validation explanation
  //   const zipCodePattern = /^\d{5}(?:[-\s]\d{4})?$/; // regex pattern for zip code
  //   return zipCodePattern.test(val); // test's value against pattern
  // };

  // const isValidEmail = (val) => {
  //   const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  //   return emailPattern.test(val);
  // };

  // const isValidCity = (val) => {
  //   const cityPattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  //   return cityPattern.test(val);
  // };

  // const isValidCountry = (val) => {
  //   const countryPattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  //   return countryPattern.test(val);
  // };

  // const isValidState = (val) => {
  //   const statePattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  //   return statePattern.test(val);
  // };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(formData);
      history.push("/matches");
    } catch (err) {
      setFormErrors(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value
    }));
  }

  //     function handleChange(e) {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //     [`${name}Error`]: !isValidZipCode(value),
  //   });
  // };

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     await signup(formData);
  //     history.push("/matches");
  //   } catch (err) {
  //     setFormErrors(err);
  //   }
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   let result = await signup(formData);
  //   if (result.success) {
  //     let mes = "You have successfully signed up!";
  //     alert(mes);
  //     history.push("/matches");
  //   } else {
  //     setFormErrors(result.errors);
  //   }
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     let result = await register(formData);
  //                 console.debug("SignupForm", "signup=", typeof signup);
  //     if (result.success) {
  //       let mes = "You have successfully signed up!";
  //       alert(mes);
  //       history.push("/matches");

  //     } else {
  //       setFormErrors(result.errors);
  //     }
  //   } catch (err) {
  //     setFormErrors(err);
  //   }
  // }

  // if (formData.interests === formData.hobbies) {
  //   setFormErrors(["Interests and hobbies cannot be the same"]);
  // }

  return (
    <Container className="SignupForm">
      <div className="container col-md-8">
        <h1 className="mb-3">Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">

          {/* <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                aria-describedby="inputGroupPrepend"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
             */}

            <Form.Group as={Col} controlId="formGridUsername">
              <InputGroup className="mb-3">
              <InputGroup.Text>Username</InputGroup.Text>
                <Form.Control
                name="username"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <InputGroup className="mb-3">
              <InputGroup.Text>Email</InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                value={formData.email}
                onChange={handleChange}
                required
              />
              </InputGroup>
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formGridUsername">
              <InputGroup.Text>Username</InputGroup.Text>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                name="username"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group> */}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <InputGroup className="mb-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                value={formData.password}
                onChange={handleChange}
                required
              />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formGridPasswordConfirm">
              <InputGroup className="mb-3">
              <InputGroup.Text>Confirm password</InputGroup.Text>
              <Form.Control
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                aria-describedby="inputGroupPrepend"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                aria-describedby="inputGroupPrepend"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                aria-describedby="inputGroupPrepend"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City:</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                aria-describedby="inputGroupPrepend"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCountry">
              <Form.Label>Country:</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Country"
                aria-describedby="inputGroupPrepend"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State:</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder="State"
                aria-describedby="inputGroupPrepend"
                value={formData.state}
                onChange={handleChange}
                required
              />
              {/* <Form.Control.Feedback type="invalid">
                Please enter a valid State.
              </Form.Control.Feedback> */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZipCode">
              <Form.Label>Zip:</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                aria-describedby="inputGroupPrepend"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
              {/* <Form.Control.Feedback type="invalid">
                Please provide a valid zip code (5 digits).
              </Form.Control.Feedback> */}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridHobbies">
              <Form.Label>Hobbies:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                as="select"
                name="hobbies"
                values={formData.hobbies}
                onChange={handleChange}
                required
              >
                <option value="">Choose...</option>
                <option value="1">Sightseeing</option>
                <option value="2">Gaming</option>
                <option value="3">Sports</option>
                <option value="4">Reading</option>
                <option value="5">Music</option>
                <option value="6">Cooking</option>
                <option value="7">Traveling</option>
                <option value="8">Shopping</option>
                <option value="9">Hiking</option>
                <option value="10">Nightlife</option>
                <option value="11">Food</option>
                <option value="12">Movies</option>
                <option value="13">Art</option>
                <option value="14">Yoga</option>
                <option value="15">Dancing</option>
                <option value="16">Museums</option>
                <option value="17">Gardening</option>
                <option value="18">Traveling</option>
                <option value="19">Photography</option>
                {/* <option value="20">Pets</option> */}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridInterests">
              <Form.Label>Interests:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                as="interests"
                name="interests"
                onChange={handleChange}
                required
              >
                <option value="">Choose...</option>
                <option value="1">Sightseeing</option>
                <option value="2">Gaming</option>
                <option value="4">Reading</option>
                <option value="5">Music</option>
                <option value="6">Cooking</option>
                <option value="7">Traveling</option>
                <option value="8">Shopping</option>
                <option value="9">Hiking</option>
                <option value="10">Nightlife</option>
                <option value="11">Food</option>
                <option value="12">Movies</option>
                <option value="13">Art</option>
                <option value="14">Yoga</option>
                <option value="15">Dancing</option>
                <option value="16">Museums</option>
                <option value="17">Gardening</option>
                <option value="18">Traveling</option>
                <option value="19">Photography</option>
                {/* <option value="20">Pets</option> */}
              </Form.Select>
            </Form.Group>
          </Row>
          {formErrors.length ? (
            <Alert type="danger" messages={formErrors} />
          ) : null}
          <Button variant="primary" type="submit" onSubmit={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );

  //   <Formik
  //     validationSchema={validationSchema}
  //     onSubmit={handleSubmit}
  //     onChange={handleChange}
  //     initialValues={{
  //       username: "",
  //       password: "",
  //       passwordConfirm: "",
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       city: "",
  //       state: "",
  //       zipCode: "",
  //       hobbies: "",
  //       interests: "",
  //       // will add later
  //       // profilePicture: "",
  //     }}
  //     >
  //     {({ handleSubmit, handleChange, values, errors, touched }) => (

  //       <Container className="SignupForm">
  //       <Form  onSubmit={handleSubmit}>
  //         <Row className="mb-3">
  //         <h1>Sign Up</h1>
  //           <Form.Group as={Col} md="4" controlId="formGridValidationUsername">
  //             <Form.Label>Username</Form.Label>
  //             <InputGroup hasValidation>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="Username"
  //                 aria-describedby="inputGroupPrepend"
  //                 name="username"
  //                 value={formData.username}
  //                 onChange={handleChange}
  //                 isInvalid={touched.username && !!errors.username}
  //               />
  //               <Form.Control.Feedback type="invalid" >
  //                 {errors.username}
  //               </Form.Control.Feedback>
  //             </InputGroup>
  //           </Form.Group>
  //           <Form.Group as={Col} md="4" controlId="formGridValidationPassword">
  //             <Form.Label>Password</Form.Label>
  //             <InputGroup hasValidation>
  //               <Form.Control
  //                 type="password"
  //                 placeholder="Password"
  //                 aria-describedby="inputGroupPrepend"
  //                 name="password"
  //                 value={formData.password}
  //                 onChange={handleChange}
  //                 isInvalid={touched.password && !!errors.password}
  //               />
  //               <Form.Control.Feedback type="invalid">
  //                 {errors.password}
  //               </Form.Control.Feedback>
  //             </InputGroup>
  //           </Form.Group>
  //           <Form.Group as={Col} md="4" controlId="formGridValidationPasswordConfirm">
  //             <Form.Label>Confirm Password</Form.Label>
  //             <InputGroup hasValidation>
  //               <Form.Control
  //                 type="password"
  //                 placeholder="Confirm Password"
  //                 aria-describedby="inputGroupPrepend"
  //                 name="passwordConfirm"
  //                 value={values.passwordConfirm}
  //                 onChange={handleChange}
  //                 isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
  //               />
  //               <Form.Control.Feedback type="invalid">
  //                 {errors.passwordConfirm}
  //               </Form.Control.Feedback>
  //             </InputGroup>
  //           </Form.Group>
  //       </Row>
  //       <Row className="col-1">
  //     <Button variant="primary" type="submit" onSubmit={handleSubmit}>
  //       Submit
  //       </Button>
  //       </Row>
  //       </Form>
  //       </Container>
  //     )}
  //   </Formik>
  // );
}

export default SignupForm;
