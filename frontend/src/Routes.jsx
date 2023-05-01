import React, { useState, useContext, useEffect } from "react";
import { Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProfileForm from "./forms/ProfileForm";
import PrivateRoute from "./routes/PrivateRoute";
import MatchDetail from "./matches/MatchDetail";
import MatchList from "./matches/MatchList";
import MatchCard from "./matches/MatchCard";
import LikeMatchList from "./matches/LikeMatchList";
import { register } from "../../backend/models/user";

function Routes({
  login,
  signup,
  updateProfile,
  currentUser,
  potentialMatches,
  likedMatches,
  matchInfo,
  getLikedMatches,
  userInfo,
}) {
  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        {!currentUser && (
          <>
            <Route exact path="/login">
              <LoginForm login={login} />
            </Route>
            <Route exact path="/register">
              <SignupForm signup={register} />
            </Route>
          </>
        )}
        <Route exact path="/">
          <Homepage />
        </Route>
        {currentUser && (
          <>
            <PrivateRoute exact path="/profile">
              <ProfileForm updateProfile={updateProfile} />
            </PrivateRoute>

            <PrivateRoute exact path="/matches">
              <MatchList
                potentialMatches={potentialMatches}
                setMatchInfo={matchInfo}
              />
            </PrivateRoute>

            <PrivateRoute exact path="/users/:username/matches/user/:user_id">
              <MatchDetail matchInfo={userInfo} setMatchInfo={matchInfo} />
            </PrivateRoute>

            <PrivateRoute exact path="/likes">
              <LikeMatchList
                likedMatches={likedMatches}
                getLikedMatches={getLikedMatches}
              />
            </PrivateRoute>
          </>
        )}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
