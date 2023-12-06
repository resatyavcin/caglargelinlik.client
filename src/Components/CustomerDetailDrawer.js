import React from "react";

import { Button, Drawer, Space, Table, Typography } from "antd";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getCustomers } from "../api.js";
const CustomerDetailDrawer = ({ isOpen, closeDrawer }) => {
  const location = useLocation();

  const { data } = useQuery("customerOne", async () => {
    return await getCustomers({ customerId: location?.state });
  });

  return (
    <Drawer
      title="Müşteri Detayı"
      placement={"right"}
      width={500}
      onClose={closeDrawer}
      open={isOpen}
      extra={
        <Space>
          <Button type="primary" onClick={closeDrawer}>
            Kapat
          </Button>
        </Space>
      }
    >
      <Typography.Text strong>Adı: </Typography.Text>
      <Typography.Text>{data?.[0]?.firstName}</Typography.Text> <br />
      <Typography.Text strong>Soyadı: </Typography.Text>
      <Typography.Text>{data?.[0]?.lastName}</Typography.Text> <br />
      <Typography.Text strong>Birincil Telefon Numarası: </Typography.Text>
      <Typography.Text>{data?.[0]?.primaryPhone}</Typography.Text> <br />
      <Typography.Text strong>İkincil Telefon Numarası: </Typography.Text>
      <Typography.Text>{data?.[0]?.secondaryPhone}</Typography.Text> <br />
      <Typography.Text strong>Adres: </Typography.Text>
      <Typography.Text>{data?.[0]?.address}</Typography.Text>
      <Table
        style={{ flex: 1 }}
        // columns={columns(navigate, showDrawer)}
        // dataSource={data?.[0]?.rentHistory}
        size="small"
        pagination={false}
      />
    </Drawer>
  );
};

export default CustomerDetailDrawer;
