import axios from "axios";

let API_URL = undefined;
if (process.env.NODE_ENV === "development") API_URL = "http://localhost:8080";

if (process.env.NODE_ENV === "production")
  API_URL = process.env.REACT_APP_MY_API_KEY;

const createCustomer = async ({
  firstName,
  lastName,
  primaryPhone,
  secondaryPhone,
  address,
}) => {
  const response = await axios.post(
    `${API_URL}/v1/customer/createCustomer`,
    { firstName, lastName, primaryPhone, secondaryPhone, address },
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      withCredentials: true,
    }
  );

  return response.data.result;
};

const getCustomers = async ({ customerId }) => {
  const response = await axios.get(
    customerId
      ? `${API_URL}/v1/customer/findCustomers?customerId=${customerId}`
      : `${API_URL}/v1/customer/findCustomers`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      withCredentials: true,
    }
  );

  return response.data.result;
};

export { createCustomer, getCustomers };
