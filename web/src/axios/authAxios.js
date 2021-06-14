import axios from "axios";

export default axios.create({
  baseURL: "/homi/api/v1/auth/family",
  headers: {
    "content-type": "application/json",
  },
});
