import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import { Card } from "react-bootstrap";
import "./MatchDetail.css";

/** Match Detail page
 *
 * Renders a potential match's profile
 *
 * Routed at users/username/matches/:user_id
 *
 * Routes -> MatchDetail -> MatchList
 */

function MatchDetail() {
  const { currentUser } = useContext(UserContext);
  const { user_id } = useParams();
  const [matchInfo, setMatchInfo] = useState([]);



  useEffect(() => {
    async function getMatchInfo() {
      try {
        let { user } = await UrGuideApi.getMatchInfo(
          currentUser.username,
          user_id
        );
        let matchInfo = { currentUser, user, user_id };
        setMatchInfo(matchInfo);
      } catch (err) {
        console.error(
          "MatchDetail useEffect getMatchInfo: problem loading",
          err
        );
      }
    }
    getMatchInfo();
  }, [currentUser, currentUser.username, user_id]);

  // if (!matchInfo) return <p>Loading...</p>;


  return (
    <div className="MatchDetail">
      <div className="user-image">
        {" "}
        {matchInfo && matchInfo.user && (
          <Card.Img variant="top" src={matchInfo.user.image_url} />
        )}{" "}
      </div>{" "} 
      <div className="user-info">
        {" "}
        {currentUser && currentUser.username ? (
          <p className="lead"> Here 's more info on me!</p>
        ) : (
          <p> Loading... </p>
        )}{" "}
        {matchInfo && matchInfo.user ? (
          <div key={matchInfo.user.user_id} className="MatchDetail-list">
            <Card.Body>
              <Card.Text><strong>Name:</strong> {matchInfo.user.first_name} </Card.Text>
              <Card.Text>
                <strong> City: </strong> {matchInfo.user.city}
              </Card.Text>{" "}
              <Card.Text>
                <strong> State: </strong> {matchInfo.user.state}
              </Card.Text>{" "}
              <strong> Country: </strong> {matchInfo.user.country}
              <Card.Text>{" "}</Card.Text>
               <Card.Text>
                <strong> Zip Code: </strong> {matchInfo.user.zip_code}
              </Card.Text>{" "}
              <Card.Text>
                <strong> Hobbies: </strong> {matchInfo.user.hobbies}
              </Card.Text>{" "}
              <Card.Text>
                <strong> Interests: </strong> {matchInfo.user.interests}
              </Card.Text>
            </Card.Body>
          </div>
        ) : (
          <p> Loading... </p>
        )}
        <Link to={`/matches`}>
            <button className="btn btn-primary"> Back to Matches </button>
        </Link>{" "}
      </div>
    </div>
  );
}

export default MatchDetail;
