import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { QueryClient, QueryClientProvider } from "react-query";
import Signin from "./pages/Signin";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CustomerList from "./pages/CustomerList";
import "react-datepicker/dist/react-datepicker.css";
import { ConfigProvider } from "antd";
import trTR from "antd/locale/tr_TR";

import "dayjs/locale/tr";
import dayjs from "dayjs";
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
    path: "/product-list",
    element: <ProductList />,
  },
]);

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ConfigProvider locale={trTR}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  </QueryClientProvider>
);

reportWebVitals();
