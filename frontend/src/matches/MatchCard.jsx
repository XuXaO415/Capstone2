import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

/** Show limited information about a user
 *
 * Rendered by MatchList to show a "card" for each user
 *
 * Routes -> MatchList -> MatchCard
 *
 * Routed at /users/:username/matches
 *
 */

function MatchCard({
  username,
  first_name,
  last_name,
  image_url,
  city,
  state,
  interests,
  hobbies,
}) {
  console.debug(
    "MatchCard",
    "username=",
    "first_name=",
    first_name,
    "last_name=",
    "city=",
    city,
    "state=",
    state,
    "interests=",
    interests,
    "hobbies=",
    hobbies
  );

  return (
    <div className="MatchCard" to={`/users/${username}/matches`}>
      <Link to={`/users/${username}/matches`}>
        <div className="card-body">
          <h3>You matched with: {username}</h3>
          <h6 className="card-title">
            {image_url && (
              <img
                src={image_url}
                alt={first_name}
                className="float-end ms-5"
              />
            )}
          </h6>
          <p>
            Name: {first_name} {last_name}
          </p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          <p>Interests: {interests}</p>
          <p>Hobbies: {hobbies}</p>
          <Button color="primary" size="sm">
            Like
          </Button>{" "}
          <Button color="danger" size="sm">
            Dislike
          </Button>
        </div>
      </Link>
    </div>
  );
}

export default MatchCard;

//{
/* <h3 className="text-center">
        {first_name} {last_name}
      </h3> */
//}
//{
/* <img src={image_url} alt={first_name} />
      <p>
        <li className="list-group">
          <strong>City:</strong> {city}
        </li>

        <li className="list-group">
          <strong>Username:</strong> {username}
        </li>
      </p> */
//}