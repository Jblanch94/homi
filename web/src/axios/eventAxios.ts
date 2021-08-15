import axios from "axios";

const auth = JSON.parse(window.localStorage.getItem("auth") ?? "{}");
const accessToken = auth.accessToken;

export default axios.create({
  baseURL: "/homi/api/v1/event",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "content-type": "application/json",
  },
});
