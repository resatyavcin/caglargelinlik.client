import React, { useEffect, useState } from "react";

import { Table, Button, Select, Flex, Typography, Segmented, Spin } from "antd";
import { useQuery } from "react-query";
import { getProduct, getProductNames } from "../api.js";
import ProductAvailableDrawer from "../Components/ProductAvailableDrawer.js";
import ProductAddModel from "../Components/ProductAddModel.js";
import MainCore from "../MainCore.js";
import { columns } from "./columns/productColumn.js";

const ProductList = () => {
  const [productCode, setProductCode] = useState("WD");

  const {
    data: productNameSelectData,
    isLoading: productNameSelectIsLoading,
    refetch: productNameSelectRefetch,
  } = useQuery("productNames", () => {
    return getProductNames({ type: productCode });
  });

  const [selectedProduct, setSelectedProduct] = useState();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["products", { selectedProduct }],
    ({ queryKey }) => {
      return getProduct({
        type: productCode,
        productName: queryKey[1]?.selectedProduct,
      });
    }
  );

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

  const PRODUCT_CODE = Object.freeze({
    WD: "Gelinlik",
    HN: "Kınalık",
    EG: "Nişanlık",
  });

  return (
    <MainCore>
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

      {productNameSelectData?.length > 0 && (
        <Select
          value={selectedProduct}
          placeholder={"Model İsmi Seçiniz"}
          style={{ width: 220, marginRight: 10, marginBottom: 20 }}
          onChange={handleChange}
          loading={productNameSelectIsLoading}
          options={productNameSelectData?.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      )}

      <Table
        loading={isLoading}
        columns={columns(showDrawer)}
        dataSource={data}
        size="small"
        pagination={{ defaultPageSize: 5 }}
        locale={{ emptyText: "Veri Bulunamadı." }}
      />

      <ProductAddModel
        isOpen={isModalOpen}
        closeModel={closeModal}
        productCode={productCode}
      />
      <ProductAvailableDrawer isOpen={isOpenDrawer} closeDrawer={closeDrawer} />
    </MainCore>
  );
};

export default ProductList;
