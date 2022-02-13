import axios from "axios";


const PORT = process.env.PORT || 3000;
// const API_URL = "http://localhost:" + PORT + "/api/auth/";
const API_URL = "https://april-yaxfullstackbankapp.herokuapp.com:" + PORT + "/api/auth/";

const DEFAULT_BALANCE = 0;
const DEFAULT_ROLE = ["USER"];

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    console.log("logout");
  }

  register(firstName, lastName, dob, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      email: email,
      password: password,
      balance: DEFAULT_BALANCE,
      roles: DEFAULT_ROLE,
    };
    console.log("newUser: " + newUser);
    return axios.post(API_URL + "createAccount", newUser);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();