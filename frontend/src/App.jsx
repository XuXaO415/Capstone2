import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UrGuideApi from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./Nav/Navigation";
import UserContext from "./context/UserContext";
import jwt from "jsonwebtoken";
import Routes from "./Routes";

export const TOKEN_STORAGE_ID = "UrGuide-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  const [currentUser, setCurrentUser] = useState({
    data: null,
    isLoaded: false,
  });

  const [potentialMatches, setPotentialMatches] = useState({
    data: null,
    isLoaded: false,
  });

  const [likedMatches, setLikedMatches] = useState({
    data: null,
    isLoaded: false,
  });

  useEffect(
    function loadUserInfo() {
      console.log(
        "App loadUserInfo =",
        Boolean(token),
        "token =",
        Boolean(token)
      );

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            UrGuideApi.token = token;
            let getUser = await UrGuideApi.getCurrentUser(username);
            setCurrentUser({
              data: getUser,
              isLoaded: true,
            });
          } catch (err) {
            console.error("App loadUserInfo error", err);
            setCurrentUser((currUser) => ({
              ...currUser,
              isLoaded: true,
            }));
          }
        } else {
          setCurrentUser({
            data: null,
            isLoaded: true,
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );

  /** Handle site-wide user logout */

  function logout() {
    setCurrentUser({
      data: null,
      isLoaded: true,
    });
    setToken(null);
  }

  /** Handle site-wide user login */

  async function login(loginData) {
    let token = await UrGuideApi.login(loginData);
    setToken(token);
  }


  /** Handles site-wide new user signup */

  async function register(signupData) {
    let token = await UrGuideApi.register(signupData);
    setToken(token);
  }

  /* Handles liking a user */

  async function likeUser(username, user_id) {
    try {
      await UrGuideApi.likeMatch(username, user_id);
      let likePotentialMatches = await UrGuideApi.likeMatch(
        currentUser.username,
        user_id
      );
      setPotentialMatches(likePotentialMatches);
    } catch (err) {
      console.error("likeUser failed", err);
    }
  }

  /* Handles disliking a user */
  async function dislikeMatch(username, user_id) {
    try {
      await UrGuideApi.dislikeMatch(username, user_id);
      let dislikeMatch = await UrGuideApi.dislikeMatch(
        currentUser.username,
        user_id
      );
      setPotentialMatches(dislikeMatch);
    } catch (err) {
      console.error("unlikeUser failed", err);
    }
  }

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          currentUser: currentUser.data,
          setCurrentUser,
          potentialMatches,
          setPotentialMatches,
          likedMatches,
          setLikedMatches,
          likeUser,
          dislikeMatch,
        }}
      >
        <BrowserRouter>
          <Navigation logout={logout} />
          <Routes
            currentUser={currentUser.data}
            login={login}
            register={register} 
          />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
