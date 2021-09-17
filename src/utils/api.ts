import axios from "axios";

const api = axios.create({
  baseURL: "localhost:3000",
  timeout: 5000,
});

export { api };
