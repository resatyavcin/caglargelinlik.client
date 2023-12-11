import axios from "axios";

let API_URL = undefined;
if (process.env.NODE_ENV === "development") API_URL = "http://localhost:8080";

if (process.env.NODE_ENV === "production")
  API_URL = process.env.REACT_APP_MY_API_KEY;

const createBooking = async ({
  customer,
  primaryTrialDate,
  secondaryTrialDate,
  isPackage,
  packageDetails = {},
  eventDate,
  productDeliveryDate,
  productReturnDate,
  productName,
  productSpecialCode,
  totalAmount,
  soldDate,
  productTakeType,
  eventType,
}) => {
  const response = await axios.post(
    `${API_URL}/v1/booking/createBooking?productTakeType=${productTakeType}&eventType=${eventType}`,
    {
      customer,
      primaryTrialDate,
      secondaryTrialDate,
      isPackage,
      packageDetails: {},
      eventDate,
      productDeliveryDate,
      productReturnDate,
      productName,
      productSpecialCode,
      totalAmount,
      soldDate,
    },
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      withCredentials: true,
    }
  );

  return response.data.result;
};

const findBookings = async ({ customerId }) => {
  const response = await axios.get(
    `${API_URL}/v1/booking/findBookings/${customerId}`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      withCredentials: true,
    }
  );

  return response.data.result;
};

export { createBooking, findBookings };
