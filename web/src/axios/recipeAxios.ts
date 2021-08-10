import axios from "axios";

const auth = JSON.parse(window.localStorage.getItem("auth") ?? "{}");
const token = auth?.accessToken;

export default axios.create({
  baseURL: "/homi/api/v1/recipe",
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  },
});
