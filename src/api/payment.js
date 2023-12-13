import axios from "axios";

let API_URL = undefined;
if (process.env.NODE_ENV === "development") API_URL = "http://localhost:8080";

if (process.env.NODE_ENV === "production")
  API_URL = process.env.REACT_APP_MY_API_KEY;

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

const isExistPayFromCus = async ({ customerId }) => {
  try {
    const response = await axios.get(
      `${API_URL}/v1/payments/customerPay/${customerId}`,
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

const deletePayment = async ({ payId, payItemId }) => {
  try {
    const response = await axios.put(
      `${API_URL}/v1/payments/customerPay/${payId}/${payItemId}`,
      {},
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

const getStatistic = async ({ startDate, endDate }) => {
  try {
    const response = await axios.post(
      `${API_URL}/v1/payments/statistic`,
      { startDate, endDate },
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

export {
  getAllPayments,
  createPayment,
  isExistPayFromCus,
  deletePayment,
  getStatistic,
};
