import axios from "axios";

const API_URL = "http://localhost:8080";

const login = async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/v1/auth/login`, {
    username,
    password,
  });

  localStorage.setItem("token", response?.data?.result?.token);

  return response.data;
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

export { login, register, logout };
