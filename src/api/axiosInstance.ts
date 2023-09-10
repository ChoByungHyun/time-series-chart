import React from "react";
import axios from "axios";
import { BASE_URL } from "constants/const";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
export default axiosInstance;
