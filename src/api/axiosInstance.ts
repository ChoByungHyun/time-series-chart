import React from "react";
import axios from "axios";
import { BASE_URL } from "constants/const";
const SERVER_URL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});
export default axiosInstance;
