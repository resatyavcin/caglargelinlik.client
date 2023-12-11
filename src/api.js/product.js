import axios from "axios";

const API_URL = "http://localhost:8080";

const getProduct = async ({ type, perPage, currentPage, productName }) => {
  try {
    const response = await axios.get(
      `${API_URL}/v1/product/getProducts/${type}?perPage=${perPage}&currentPage=${currentPage}&productName=${productName}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );

    return response.data.result;
  } catch (error) {
    throw error;
  }
};

const getProductOne = async ({ productId }) => {
  const response = await axios.get(
    `${API_URL}/v1/product/getProductOne/${productId}`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      withCredentials: true,
    }
  );

  return response.data.result;
};

const getProductNames = async ({ type }) => {
  const response = await axios.get(
    `${API_URL}/v1/product/getProductNames/${type}`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      withCredentials: true,
    }
  );

  return response.data.result;
};

const createProduct = async ({ code, name, isSecondHand, specialCode }) => {
  const response = await axios.post(
    `${API_URL}/v1/product/createProduct`,
    { code, name, isSecondHand, specialCode },
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      withCredentials: true,
    }
  );

  return response.data.result;
};

const deleteProduct = async ({ productId }) => {
  try {
    const response = await axios.delete(
      `${API_URL}/v1/product/deleteProduct/${productId}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );

    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};

const receivingProduct = async ({ booking }) => {
  try {
    const response = await axios.put(
      `${API_URL}/v1/product/receiving?booking=${booking}`,
      {},
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );

    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};

const receivingProductCancel = async ({ booking }) => {
  try {
    const response = await axios.put(
      `${API_URL}/v1/product/receiving-cancel?booking=${booking}`,
      {},
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );

    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};

const testAPI = async () => {
  const response = await axios.get(`${API_URL}/v1/product/test`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
    withCredentials: true,
  });

  return response.data;
};

export {
  getProduct,
  getProductNames,
  createProduct,
  testAPI,
  getProductOne,
  deleteProduct,
  receivingProduct,
  receivingProductCancel,
};
