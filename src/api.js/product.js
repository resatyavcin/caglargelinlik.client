import axios from "axios";

const API_URL = "http://localhost:8080";

const getProduct = async ({ type, perPage, currentPage, productName }) => {
  const response = await axios.get(
    `${API_URL}/v1/product/getProducts/${type}?perPage=${perPage}&currentPage=${currentPage}&productName=${productName}`,
    { withCredentials: true }
  );

  return response.data.result;
};

const getProductNames = async ({ type }) => {
  const response = await axios.get(
    `${API_URL}/v1/product/getProductNames/${type}`,
    { withCredentials: true }
  );

  return response.data.result;
};

export { getProduct, getProductNames };
