import React from "react";

import { Button, Drawer, Space } from "antd";

const CustomerDetailDrawer = ({ isOpen, closeDrawer }) => {
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
    ></Drawer>
  );
};

export default CustomerDetailDrawer;
