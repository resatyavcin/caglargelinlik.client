import axios from "axios";

const API_URL = "http://localhost:8080";

const getProduct = async ({ type, perPage, currentPage, productName }) => {
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

const createProduct = async ({ code, name, isSecondHand }) => {
  const response = await axios.post(
    `${API_URL}/v1/product/createProduct`,
    { code, name, isSecondHand },
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
};
