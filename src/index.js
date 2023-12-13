import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ConfigProvider } from "antd";
import dayjs from "dayjs";

import ProductList from "./pages/ProductList";
import CustomerList from "./pages/CustomerList";
import Signin from "./pages/Signin";
import Verify from "./pages/Verify";
import Booking from "./pages/Booking";

import "react-datepicker/dist/react-datepicker.css";
import "dayjs/locale/tr";
import "./index.css";
import trTR from "antd/locale/tr_TR";
import { AuthProvider } from "./AuthProvider";
import GeneralCalendar from "./pages/GeneralCalendar";
import Admin from "./pages/Admin";

dayjs.locale("tr");

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerList />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/verify-2fa",
    element: <Verify />,
  },
  {
    path: "/product-list",
    element: <ProductList />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },
  {
    path: "/calendar",
    element: <GeneralCalendar />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AuthProvider>
        <ConfigProvider locale={trTR}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AuthProvider>
    </React.StrictMode>
  </QueryClientProvider>
);

reportWebVitals();
