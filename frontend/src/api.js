import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class UrGuideApi {
  // store API token here
  static token;

  static async request(endpoint, data = {}, method = "GET") {
    console.debug("API Call:", endpoint, data, method);

    const _token = localStorage.getItem(TOKEN_STORAGE_ID);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${UrGuideApi.token}`
    };
    const response = await axios({
      url,
      data,
      method,
      headers
    });
    const params = method === "GET" ? data : {};
    console.debug("API Response:", response.data, params);

    try {
      return (
        await axios({
          url,
          method,
          data,
          params,
          headers
        })
      ).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API calls

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** auth methods */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "POST");
    console.debug(res, "res from login was successful");
    return res.token;
  }

  static async register(data) {
    let res = await this.request(`auth/register`, data, "POST");
    console.debug("res from register was successful", Boolean(res.token));
    // console.log ("Backend response from register:", res, "res from register was successful")
    return res.token;
  }

  /** Create a new user  */

  static async createUser(data) {
    let res = await this.request(`users`, data, "POST");
    return res.user;
  }

  /* Update user profile */

  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "PATCH");
    console.log(res, "res from updateProfile was successful");
    return res.user;
  }

  static async getMatchInfo(currentUser, user_id) {
    let res = await this.request(
      `users/${currentUser}/matches/user/${user_id}`,
      {},
      "GET"
    );
    return res;
  }

  static async getPotentialMatches(currentUser) {
    let res = await this.request(`users/${currentUser}/matches/users`, {});
    console.log(
      "res from getPotentialMatches:",
      res,
      Boolean(res.users) ? "working properly...🥳" : "fix this...😭"
    );
    return res.users;
  }
  static async getLikedMatches(currentUser) {
    let res = await this.request(
      `users/${currentUser}/matches/likes`,
      {},
      "GET"
    );
    console.log(
      "res from getLikedMatches:",
      res,
      "currentUser:",
      currentUser,
      Boolean(res.users) ? "🥳" : "doh...😭"
    );
    return res.users;
  }

  static async likeMatch(currentUser, user_id) {
    let res = await this.request(
      `users/${currentUser}/matches/like/${user_id}`,
      {},
      "POST"
    );
    console.log(
      "POST was successful and",
      {
        currentUser
      },
      "liked",
      {
        user_id
      }
    );
    return res.status;
  }

  static async dislikeMatch(currentUser, user_id) {
    let res = await this.request(
      `users/${currentUser}/matches/dislike/${user_id}`,
      {},
      "POST"
    );
    console.log(
      "res from dislikeMatch:",
      res,
      {
        currentUser
      },
      "disliked",
      {
        user_id
      }
    );
    return res.status;
  }
}

/* ************************************************************* */

export default UrGuideApi;
