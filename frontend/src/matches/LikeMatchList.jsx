import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import MatchCard from "./MatchCard";
import "./LikeMatchList.css";

/** This component retrieves a user's likes and displays it's list here.
 *
 * On mount, retrieves a list of liked users
 *
 * Routed at /:users/:username/matches/likes
 *
 */

const LikeMatchList = () => {
  const { currentUser, user_id } = useContext(UserContext);
  const [likedMatches, setLikedMatches] = useState(null);
  const [error, setError] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);
  const [matches, setMatches] = useState(null);
  // const [removeMatch] = useState(null);
  const [removeMatch, setRemoveMatch] = useState(null);

  useEffect(
    () => {
      (async () => {
        try {
          const res = await UrGuideApi.getLikedMatches(
            currentUser.username,
            user_id
          );
          if (res) {
            setLikedMatches(res);
          } else {
            setLikedMatches([]);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    },
    [currentUser.username, user_id]
  );

  // async function dislikeMatch(user_id) {
  //   try {
  //     function removeMatch(user_id) {
  //       UrGuideApi.dislikeMatch(currentUser.username, user_id);
  //     }
  //       UrGuideApi.dislikeMatch(currentUser.username, user_id);
  //       // console.log("removeMatch", removeMatch);
  //       setLikedMatches((m) => m.filter((match) => match.user_id !== user_id));
  //     setTimeout(() => {
  //         removeMatch(user_id);
  //       }, 2000);
  //     } catch (errors) {
  //   } finally {
  //     console.log("removeMatch", removeMatch);
  //       setMatchInfo(likedMatches);
  //     }
  // }

  async function dislikeMatch(user_id) {
    function removeMatch(user_id) {
      UrGuideApi.dislikeMatch(currentUser.username, user_id);
    }
    try {
      UrGuideApi.dislikeMatch(currentUser.username, user_id);
      setLikedMatches(m => m.filter(match => match.user_id !== user_id));
      setTimeout(() => {
        removeMatch(user_id);
      }, 2000);
    } catch (errors) {
    } finally {
      console.log("removeMatch", removeMatch);
      setMatchInfo(likedMatches);
    }
  }

  // async function dislikeMatch(user_id) {
  //   try {
  //      UrGuideApi.deleteMatch(currentUser.username, user_id);
  //     console.log("removeMatch", removeMatch);
  //     setMatchInfo(removeMatch);
  //     setLikedMatches((m) => m.filter((match) => match.user_id !== user_id));
  //     setTimeout(() => {
  //       setMatchInfo(removeMatch);
  //     }, 2000);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setMatchInfo([]);
  //   }
  // }

  // async function dislikeMatch(user_id) {
  //   try {
  //     await new Promise((resolve) => {
  //       UrGuideApi.deleteMatch(currentUser.username, user_id).then(() => {
  //         setLikedMatches((m) =>
  //           m.filter((match) => match.user_id !== user_id)
  //         );
  //         console.log("dislikeMatch: ", user_id);
  //         setTimeout(() => {
  //           // setMatchInfo(user_id);
  //           removeMatch(user_id);
  //           resolve();
  //         }, 2000);
  //       });
  //     });
  //   } catch (error) {
  //     setError(error);
  //   }
  // }

  if (error) return <p> Sorry, there was an error </p>;

  if (!likedMatches) return <p> Loading... </p>;

  return likedMatches.length
    ? <div className="Liked-matches">
        <div className="text-center">
          <h1 className="display-4">
            {" "}{currentUser.username}
            's liked matches{" "}
          </h1>{" "}
          {likedMatches.map((l, idx) =>
            <MatchCard
              key={idx}
              user_id={l.user_id}
              username={l.username}
              first_name={l.first_name}
              image_url={l.image_url}
              city={l.city}
              state={l.state}
              country={l.country}
              zip_code={l.zip_code}
              interests={l.interests}
              hobbies={l.hobbies}
              dislike={dislikeMatch}
              matchInfo={matchInfo}
            />
          )}{" "}
          <Link to={`/matches`}>
            <button className="btn btn-primary"> Back to matches </button>{" "}
          </Link>{" "}
        </div>{" "}
      </div>
    : <div className="alert alert-warning" role="alert">
        <p className="lead"> You haven't liked any users yet</p>
      </div>;
};
export default LikeMatchList;
