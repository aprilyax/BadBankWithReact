import axios from "axios";
import authHeader from "./auth-header";


// const PORT = process.env.PORT || 3000;
// const API_URL = "http://localhost:" + PORT + "/api/user/";
const API_URL = "https://april-yaxfullstackbankapp.herokuapp.com/api/user/";

class UserService {
  getUserBalance(userID) {
    return axios
      .get(API_URL + "balance/" + userID, { headers: authHeader() })
      .then((response) => {
        console.log("response: getUserBalance");
        console.log(response.data);
        return response.data;
      });
  }

  updateUserBalance(userID, amount, balance, transType) {
    const body = {
      amount: amount,
      balance: balance,
      transType: transType,
    };
    console.log("updateUserBalance: " + API_URL + "balance/" + userID);
    return axios
      .put(API_URL + "balance/" + userID, body, { headers: authHeader() })
      .then((response) => {
        console.log("response: updateUserBalance");
        console.log(response.data);
        return response.data;
      });
  }

  getUserTrans(userID) {
    return axios
      .get(API_URL + "transactions/" + userID, { headers: authHeader() })
      .then((response) => {
        console.log("response: getUserTrans");
        console.log(response.data);
        return response.data;
      });
  }

  getAllUsers(userID) {
    return axios
      .get(API_URL + "all/" + userID, { headers: authHeader() })
      .then((response) => {
        console.log("response: getAllUsers");
        console.log(response.data);
        return response.data;
      });
  }
}

export default new UserService();