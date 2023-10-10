import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/v5/",
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`,
  },
});

export default api;
