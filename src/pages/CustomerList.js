import React, { useEffect, useState } from "react";
import CustomerAddModel from "../components/CustomerAddModel";
import { Table, Button, Flex, Typography, Result, Input } from "antd";
import { getCustomers } from "../api.js";
import { useQuery } from "react-query";
import { columns } from "./columns/customerColumn";
import CustomerDetailDrawer from "../components/CustomerDetailDrawer";
import MainCore from "../MainCore";
import { Link, useNavigate } from "react-router-dom";

const CostumerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  const { data, isLoading, error, isError } = useQuery(
    ["customers"],
    () => {
      return getCustomers({ customerId: undefined });
    },
    { retry: 2, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setFilteredData(
      data?.filter((col) => {
        return searchTxt.length > 0
          ? col?.firstName?.toLowerCase().includes(searchTxt) ||
              col?.lastName?.toLowerCase().includes(searchTxt) ||
              col?.address?.toLowerCase().includes(searchTxt) ||
              col?.primaryPhone?.toLowerCase().includes(searchTxt) ||
              col?.secondaryPhone?.toLowerCase().includes(searchTxt)
          : true;
      })
    );
  }, [data, searchTxt]);

  const navigate = useNavigate();

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

  if (isError) {
    if (error?.response?.status === (401 || 403)) {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Link to={"/signin"}> Giriş Yap</Link>}
        />
      );
    }
  }

  return (
    <MainCore>
      <Flex justify="space-between" align="center" style={{ marginBottom: 10 }}>
        <Typography.Title level={3}>Müşteri Listesi</Typography.Title>

        <Button type="primary" onClick={showModal}>
          Müşteri Ekle
        </Button>
      </Flex>

      <Input
        onChange={(e) => setSearchTxt(e.target.value)}
        placeholder="Ad, soyad,adres, telefon arayın..."
        style={{ marginBottom: 10 }}
      />
      <Table
        rowKey={"_id"}
        loading={isLoading}
        columns={columns(navigate, showDrawer)}
        dataSource={filteredData}
        size="small"
        pagination={{ defaultPageSize: 5 }}
      />
      {isModalOpen && (
        <CustomerAddModel isOpen={isModalOpen} closeModel={closeModal} />
      )}
      {isOpenDrawer && (
        <CustomerDetailDrawer isOpen={isOpenDrawer} closeDrawer={closeDrawer} />
      )}
    </MainCore>
  );
};

export default CostumerList;
