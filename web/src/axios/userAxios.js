import axios from "axios";

const accessToken = JSON.parse(
  window.localStorage.getItem("auth")
)?.accessToken;
console.log(accessToken);

export default axios.create({
  baseURL: "/homi/api/v1/user",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
