import axios from "axios";

const API_URL = "http://localhost:8080";
console.log(process.env.NODE_ENV);
const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${API_URL}/v1/auth/login`, {
      username,
      password,
    });

    localStorage.setItem("token", response?.data?.result?.token);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const verify = async ({ token }) => {
  try {
    const response = await axios.post(`${API_URL}/v1/verify`, {
      token,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const register = async ({ username, password, admin }) => {
  const response = await axios.post(`${API_URL}/v1/auth/signup`, {
    username,
    password,
    admin,
  });
  return response.data;
};

const logout = async () => {
  localStorage.clear();
};

export { login, register, logout, verify };
