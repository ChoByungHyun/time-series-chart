import axiosInstance from "./axiosInstance";

const ENDPOINT_SICK = "/response";

const getClinicalTrial = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT_SICK);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getClinicalTrial;
