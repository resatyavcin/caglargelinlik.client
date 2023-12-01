import React, { useEffect, useState } from "react";

import {
  Table,
  Button,
  Select,
  Tag,
  Checkbox,
  Typography,
  Drawer,
  Space,
  Calendar,
  Modal,
} from "antd";
import { useQuery } from "react-query";
import { getProduct, getProductNames } from "../api.js";
import { CalendarTwoTone } from "@ant-design/icons";
import ProductAdd from "../forms/ProductAdd.js";
import ProductAvailableDrawer from "../Components/ProductAvailableDrawer.js";
import ProductAddModel from "../Components/ProductAddModel.js";
import MainCore from "../MainCore.js";

const columns = (showCalendarDrawer) => [
  {
    key: 1,
    title: "Ürün Adı",
    dataIndex: "name",
  },
  {
    key: 2,
    title: "Ürün Kullanımı",
    dataIndex: "isSecondHand",
    render: (_, { isSecondHand }) => (
      <>
        <Tag color={isSecondHand ? "orange" : "green"}>
          {isSecondHand ? "İkinci El" : "Sıfır"}
        </Tag>
      </>
    ),
  },
  {
    key: 3,
    title: "Ürün Aktifliği",
    dataIndex: "isActive",
    filters: [
      {
        text: "Aktif",
        value: true,
      },
      {
        text: "Aktif Değil",
        value: false,
      },
    ],

    onFilter: (value, record) => record.isActive === value,
    render: (_, { isActive, isSold }) => (
      <>
        {!isSold ? (
          <Checkbox disabled defaultChecked={isActive}>
            <Typography.Text strong type={!isActive ? "warning" : "secondary"}>
              {!isActive ? "Kiralandı" : "Depoda"}{" "}
            </Typography.Text>
          </Checkbox>
        ) : (
          <Typography.Text strong type="danger">
            Satıldı
          </Typography.Text>
        )}
      </>
    ),
  },
  {
    key: 4,
    title: "Ürün Müsaitliği",
    dataIndex: "calendar",
    render: (_, { isSold }) => (
      <>
        {!isSold && (
          <Button
            type="text"
            icon={<CalendarTwoTone />}
            size={"middle"}
            onClick={showCalendarDrawer}
          />
        )}
      </>
    ),
  },
];

const ProductList = () => {
  var currentUrl = window.location.href;

  var urlParts = currentUrl.split("/");

  var paramValue = urlParts[urlParts.length - 1];

  const {
    data: productNameSelectData,
    isLoading: productNameSelectIsLoading,
    isFetched: productNameSelectIsFetched,
    isSuccess: productNameSelectIsSuccess,
  } = useQuery("productNames", () => {
    return getProductNames({ type: paramValue.toUpperCase() });
  });

  const [selectedProduct, setSelectedProduct] = useState();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["fetchData", { selectedProduct }],
    ({ queryKey }) => {
      return getProduct({
        type: paramValue.toUpperCase(),
        perPage: 5,
        currentPage: 1,
        productName: queryKey[1].selectedProduct,
      });
    }
  );

  useEffect(() => {
    setSelectedProduct(productNameSelectData?.[0]);
  }, [productNameSelectData]);

  const handleChange = async (value) => {
    setSelectedProduct(value);
    await refetch();
  };

  const showDrawer = () => {
    setIsOpenDrawer(true);
  };

  const closeDrawer = () => {
    setIsOpenDrawer(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainCore>
      <div style={{ marginBottom: 20 }}>
        {productNameSelectData?.length > 0 && (
          <Select
            disabled={!selectedProduct}
            defaultValue={selectedProduct}
            style={{ width: 220, marginRight: 10 }}
            onChange={handleChange}
            loading={productNameSelectIsLoading}
            options={productNameSelectData?.forEach((item) => ({
              label: item,
              value: item,
            }))}
          />
        )}

        <Button type="primary" onClick={showModal}>
          Ürün Ekle
        </Button>
      </div>

      <Table
        loading={isLoading}
        columns={columns(showDrawer)}
        dataSource={data}
        size="small"
        pagination={{ defaultPageSize: 2 }}
      />

      <ProductAddModel isOpen={isModalOpen} closeDrawer={closeModal} />
      <ProductAvailableDrawer isOpen={isOpenDrawer} closeDrawer={closeDrawer} />
    </MainCore>
  );
};

export default ProductList;
