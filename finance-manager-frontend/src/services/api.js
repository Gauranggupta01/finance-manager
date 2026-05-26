import axios from "axios";

const API = axios.create({
  baseURL: "https://finance-manager-jbir.onrender.com",
});

export default API; 