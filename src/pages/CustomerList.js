import React, { useState } from "react";
import CustomerAddModel from "../components/CustomerAddModel";
import { Table, Button, Flex, Typography } from "antd";
import { getCustomers } from "../api.js";
import { useQuery } from "react-query";
import { columns } from "./columns/customerColumn";
import CustomerDetailDrawer from "../components/CustomerDetailDrawer";
import MainCore from "../MainCore";

const CostumerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const { data, isLoading } = useQuery("customers", () => {
    return getCustomers({ customerId: undefined });
  });

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
      <Flex justify="space-between" align="center" style={{ marginBottom: 10 }}>
        <Typography.Title level={3}>Müşteri Listesi</Typography.Title>

        <Button type="primary" onClick={showModal}>
          Müşteri Ekle
        </Button>
      </Flex>

      <Table
        loading={isLoading}
        columns={columns(showDrawer)}
        dataSource={data}
        size="small"
        pagination={{ defaultPageSize: 5 }}
        locale={{ emptyText: "Veri Bulunamadı." }}
      />

      <CustomerAddModel isOpen={isModalOpen} closeModel={closeModal} />
      <CustomerDetailDrawer isOpen={isOpenDrawer} closeDrawer={closeDrawer} />
    </MainCore>
  );
};

export default CostumerList;
