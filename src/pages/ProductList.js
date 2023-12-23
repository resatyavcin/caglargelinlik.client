import React, { useEffect, useMemo, useState } from "react";

import {
  Table,
  Button,
  Select,
  Flex,
  Typography,
  Segmented,
  Calendar,
  message,
} from "antd";
import { useQuery } from "react-query";
import { getProduct, getProductNames } from "../api";
import ProductAvailableDrawer from "../components/ProductAvailableDrawer";
import ProductAddModel from "../components/ProductAddModel";
import MainCore from "../MainCore";
import { columns } from "./columns/productColumn";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// Yardımcı fonksiyon
function getDateRange(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const range = [];

  let currentDate = start;
  while (currentDate?.isBefore(end) || currentDate?.isSame(end)) {
    range.push(currentDate?.format("DD-MM-YYYY"));
    currentDate = currentDate.add(1, "day");
  }

  return range;
}

function calculateDateRange(data) {
  const result = [];

  data?.forEach((item) => {
    if (item?.isPackage && item?.packageDetails) {
      const { departureDate, arrivalDate } = item?.packageDetails;
      result.push(...getDateRange(departureDate, arrivalDate));
    } else if (!item?.isPackage) {
      const { productDeliveryDate, productReturnDate } = item;
      result.push(...getDateRange(productDeliveryDate, productReturnDate));
    }
  });

  return result;
}

function findSameItem(arrays) {
  const firstSet = new Set(arrays[0]);

  const commonCharacters = [...firstSet].filter((char) =>
    arrays.every((arr) => new Set(arr).has(char))
  );

  return commonCharacters;
}

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const ProductList = () => {
  const [productCode, setProductCode] = useState("WD");
  const [selectedProduct, setSelectedProduct] = useState();
  const [productNameSelectDataState, setProductNameSelectDataState] = useState(
    []
  );
  const [messageApi, contextHolder] = message.useMessage();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: productNameSelectData,
    isLoading: productNameSelectIsLoading,
    refetch: productNameSelectRefetch,
  } = useQuery(
    ["productNames"],
    () => {
      return getProductNames({ type: productCode });
    },
    {
      onSuccess: (data) => {
        setProductNameSelectDataState(data);
      },
    }
  );

  const { data, isLoading, refetch } = useQuery(
    ["products", { selectedProduct }],
    ({ queryKey }) => {
      return getProduct({
        type: productCode,
        productName: queryKey[1]?.selectedProduct,
      });
    },
    { retry: 0, refetchOnWindowFocus: false, cacheTime: 20 }
  );
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedProduct(productNameSelectData?.[0]);
  }, [productNameSelectData, productCode]);

  useEffect(() => {
    refetch();
    productNameSelectRefetch();
    setSelectedProduct();
  }, [productCode, productNameSelectRefetch, refetch]);

  const handleChange = async (value) => {
    await refetch();
    setSelectedProduct(value);
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

  const commonDateRange = useMemo(() => {
    const allDatas = data?.map((item) => {
      return calculateDateRange(item?.rentHistory);
    });

    return findSameItem(allDatas || []);
  }, [data]);

  const PRODUCT_CODE = Object.freeze({
    WD: "Gelinlik",
    HN: "Kınalık",
    EG: "Nişanlık",
  });

  return (
    <MainCore>
      {contextHolder}
      <Segmented
        style={{ marginBottom: 20 }}
        size="large"
        onChange={async (value) => {
          setProductCode(
            Object.keys(PRODUCT_CODE).find(
              (item) => PRODUCT_CODE[item] === value
            )
          );
        }}
        options={[PRODUCT_CODE.WD, PRODUCT_CODE.EG, PRODUCT_CODE.HN]}
        block
      />
      <Flex justify="space-between" align="center" style={{ marginBottom: 10 }}>
        <Typography.Title level={3}>
          {PRODUCT_CODE[productCode]} Modelleri
        </Typography.Title>

        <Button type="primary" onClick={showModal}>
          Ürün Ekle
        </Button>
      </Flex>

      {productNameSelectDataState?.length > 0 && (
        <Select
          value={selectedProduct}
          placeholder={"Model İsmi Seçiniz"}
          showSearch
          style={{ width: 220, marginRight: 10, marginBottom: 20 }}
          onChange={handleChange}
          loading={productNameSelectIsLoading}
          filterOption={filterOption}
          options={productNameSelectDataState?.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      )}

      <Flex gap={25} justify="space-between">
        <Table
          rowKey={"_id"}
          style={{ flex: 1 }}
          loading={isLoading}
          columns={columns(navigate, showDrawer)}
          dataSource={data}
          size="small"
          pagination={{ defaultPageSize: 5 }}
        />
        <Calendar
          style={{ maxWidth: 250 }}
          fullscreen={false}
          disabledDate={(date) => {
            return commonDateRange.includes(date.format("DD-MM-YYYY"));
          }}
        />
      </Flex>

      {isModalOpen && (
        <ProductAddModel
          isOpen={isModalOpen}
          closeModel={closeModal}
          productCode={productCode}
          messageApi={messageApi}
        />
      )}
      {isOpenDrawer && (
        <ProductAvailableDrawer
          isOpen={isOpenDrawer}
          closeDrawer={closeDrawer}
          messageApi={messageApi}
        />
      )}
    </MainCore>
  );
};

export default ProductList;
