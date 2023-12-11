import axios from "axios";

const API_URL = "http://localhost:8080";

const createPayment = async ({ booking, paidBy, paidAmount }) => {
  try {
    const response = await axios.put(
      `${API_URL}/v1/payments?booking=${booking}`,
      { paidBy, paidAmount },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllPayments = async ({ booking }) => {
  try {
    const response = await axios.get(
      `${API_URL}/v1/payments?booking=${booking}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAllPayments, createPayment };
