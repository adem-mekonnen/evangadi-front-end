import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://evangadi-forum-backend-3mez.onrender.com",
  // "http://localhost:5003/api/v1",
});

export default baseUrl;
