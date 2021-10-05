import axios from "axios";

// TODO: Read baseURL from .env file
const api = axios.create({
  baseURL: "http://192.168.1.80:3001",
  timeout: 5000,
});

export { api };
