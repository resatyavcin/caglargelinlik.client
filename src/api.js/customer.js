import axios from "axios";

const API_URL = "http://localhost:8080";

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
      withCredentials: true,
    }
  );

  return response.data.result;
};

const getCustomers = async ({ customerId }) => {
  const response = await axios.get(
    `${API_URL}/v1/customer/findCustomers?=customerId=${customerId}`,
    {
      withCredentials: true,
    }
  );

  return response.data.result;
};

export { createCustomer, getCustomers };
