import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, Route } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import MatchCard from "./MatchCard";
import { Button } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";
import "./MatchList.css"
import "../index.css"

/** Show page with a list of potential matches
 *
 * On mount, loads list of potential matches and updates via setMatches
 * Re-loads list of potential matches upon "like" or "dislike"
 *
 * Routed at /users/:username/matches
 *
 * Routes -> MatchList -> {MatchDetail, MatchCard}
 *
 */

const MatchList = () => {
  const { currentUser, user_id } = useContext(UserContext);
  const [matches, setMatches] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);
  const [setError] = useState(null);

  useEffect(() => {
    (async () => {
      const matches = await UrGuideApi.getPotentialMatches(
        currentUser.username,
        user_id
      );
      setMatches(matches);
    })();
  }, [currentUser, user_id]);

  async function likeMatch(user_id) {
    try {
      let matchInfo = UrGuideApi.likeMatch(currentUser.username, user_id);
      setMatchInfo(matchInfo);
      setMatches((m) => m.filter((match) => match.user_id !== user_id));
      setTimeout(() => {
        setMatchInfo(user_id);
      }, 2000);
    } catch (errors) {
      setError(errors);
    }
  }


  async function dislikeMatch(user_id) {
    try {
      let matchInfo = UrGuideApi.dislikeMatch(currentUser.username, user_id);
      console.log("matchInfo", matchInfo);
      setMatchInfo(matchInfo);
      setMatches((m) => m.filter((match) => match.user_id !== user_id));
      setTimeout(() => {
        setMatchInfo(user_id);
      }, 2000);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    if (matches && matches.length === 0) {
      (async () => {
        const matches = await UrGuideApi.getPotentialMatches(
          currentUser.username,
          user_id
        );
        setMatches(matches);
      })();
    }
  }, [matches, currentUser, user_id]);

  if (!matches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <div className="text-center">
        <h1 className="match-header">
          Hey {currentUser.username}, here are some of your matches
        </h1>
        <p className="lead">Click on user info for more details</p>
        {matches.length ? (
          <div className="MatchList-list">
            {matches.map((m) => (
              <MatchCard
                key={m.user_id}
                user_id={m.user_id}
                username={m.username}
                first_name={m.first_name}
                city={m.city}
                state={m.state}
                zip_code={m.zip_code}
                country={m.country}
                image_url={m.image_url}
                interests={m.interests}
                hobbies={m.hobbies}
                like={likeMatch}
                dislike={dislikeMatch}
                matchInfo={matchInfo}
              />
            ))}
            <div className="like-button">
            <Link to={`/likes`}>
              <Button variant="primary" float="right">Liked Matches</Button>
              </Link>
              </div>
          </div>
        ) : (
          <p className="lead">No matches yet!</p>
        )}
  
      </div>
    </div>
  );
};

export default MatchList;
