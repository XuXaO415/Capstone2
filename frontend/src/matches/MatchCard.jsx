import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import UrGuideApi from "../api";
import Alert from "../common/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "./MatchCard.css";
import MatchList from "./MatchList";
import LikeMatchList from "./LikeMatchList";

/** Show limited information about a user
 *
 * Rendered by MatchList to show a "card" for each user
 *
 * Routes -> MatchList -> MatchCard
 *
 * Routed at /users/:username/matches
 *
 */

const MatchCard = ({
  username,
  user_id,
  first_name,
  image_url,
  country,
  city,
  state,
  zip_code,
  interests,
  hobbies,
  like,
  dislike,
 
}) => {
  const { currentUser } = useContext(UserContext);

  function likeMatch() {
    const handleLike = (e) => {
      e.preventDefault();
      console.log("MatchCard handleLike: user_id=", user_id, "was liked");
      like(user_id);
    };

    return (
      <Button
        variant="primary"
        size="sm"
        className="float-right"
        onClick={handleLike}
      >
        Like{" "}
      </Button>
    );
  }

  function dislikeMatch() {
    const handleDislike = (e) => {
      e.preventDefault();
      console.log("MatchCard handleDislike: user_id=", user_id, "was disliked",
      Boolean(dislike));
      dislike(user_id);
    };

    return (
      <Button
        variant="danger"
        size="sm"        
        className="float-left"
        onClick={handleDislike}
      >
        Dislike{" "}
      </Button>
    );
  }

  return (
    <div
      className="MatchCard card"
      to={`users/${username}/matches/user/${user_id} `}
    >
      <div className="card-body">
        <h3>
          You matched with: {username}, <br />{" "}
        </h3>{" "}
        <h6 className="card-title">
          {" "}
          {image_url && (
            <img
              src={image_url}
              alt={`User ${username} profile pic`}
              className="float-end ms-5"
            />
          )}{" "}
        </h6>{" "}
        <p> Name: {first_name} </p>
        <p> City: {city} </p>{" "}
        <p> State: {state} </p>
        <p> Country: {country} </p>{" "}
        <p> Zip Code: {zip_code} </p>
        <p> Interests: {interests} </p>
        <p> Hobbies: {hobbies} </p>{" "}
        {likeMatch()}<span></span>
        {dislikeMatch({ user_id, dislike })}{" "}
        {/* {dislikeMatch()}{" "} */}
        <div className="user-info-pill">
          <Badge pill bg="light" text="white" position="right">
            <Link to={`users/${currentUser.username}/matches/user/${user_id}`}>
              user info{" "}
            </Link>{" "}
          </Badge>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default MatchCard;
