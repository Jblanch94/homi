import axios from "axios";

export default axios.create({
  baseURL: "/homi/api/v1/family",
  headers: {
    "content-type": "application/json",
  },
});
