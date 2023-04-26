import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import UrGuideApi from "../api";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "../common/Alert";
import "./ProfileForm.css";


function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    password: currentUser.password,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    city: currentUser.city,
    country: currentUser.country,
    zip_code: currentUser.zip_code,
    hobbies: currentUser.hobbies,
    interests: currentUser.interests,
  });

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  console.debug(
    "ProfileForm",
    "currentUser=",
    currentUser,
    "formData=",
    formData,
    "formErrors=",
    "saveConfirmed=",
    saveConfirmed
  );

  async function handleSubmit(e) {
    e.preventDefault();
    let profileData = {
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      city: formData.city,
      country: formData.country,
      zip_code: formData.zip_code,
      hobbies: formData.hobbies,
      interests: formData.interests,
    };
    let username = currentUser.username;
    let updatedUser;

    try {
      updatedUser = await UrGuideApi.updateProfile(username, profileData);
    } catch (err) {
      console.error("ProfileForm: problem updating profile", err);
      setFormData(err);
      return;
    }

    setFormData((fData) => ({ ...fData }));
    setFormErrors([]);
    setSaveConfirmed(true);

    setCurrentUser((currentUser) => ({
      ...currentUser,
      data: updatedUser,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
    setFormErrors([]);
  }

  return (
    <div className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h1 className="profile-header">Update Profile</h1>
      <div className="profile-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formHorizontalUsername">
            <Form.Label column sm={4}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                disabled={true}
                placeholder={formData.username}
                name="username"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={4}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalFirstName">
            <Form.Label column sm={4}>
              First Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalLastName">
            <Form.Label column sm={4}>
              Last Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalCity">
            <Form.Label column sm={4}>
              City
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalCity">
            <Form.Label column sm={4}>
              Country
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalCity">
            <Form.Label column sm={4}>
              Zip Code
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="zip code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalCity">
            <Form.Label column sm={4}>
              Hobbies
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="hobbies"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalCity">
            <Form.Label column sm={4}>
              Interests
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          {formErrors.length ? (
            <Alert type="danger" messages={formErrors} />
          ) : null}

          {saveConfirmed ? (
            <Alert
              type="success"
              messages={["Your profile updated successfully."]}
              timeout={3000}
            />
          ) : null}
          {saveConfirmed ? <Redirect to="/matches" /> : null}

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 20, offset: 4 }}>
              <Button type="submit">Save</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}


export default ProfileForm;
